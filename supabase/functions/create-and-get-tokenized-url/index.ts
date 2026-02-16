// Supabase Edge Function: CreateAndGetTokenizedURL
// ------------------------------------------------
// Business purpose:
// Create a short-lived token for a user email, store it, and email the user a link
// that includes the token (a "tokenized URL") so they can set/reset their password.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// If you call this from the browser, CORS is required.
const ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "https://www.stockownerreport.com",
]);

function buildCorsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get("origin") ?? "";
  // BA note: Only allow your known front-end sites.
  // If origin is not allowed, we simply don't set Allow-Origin and the browser blocks it.
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function json(req: Request, status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  const requestId = crypto.randomUUID?.() ?? `${Date.now()}`;

  // Simple log helpers
  const log = (step: string, msg: string, meta?: Record<string, unknown>) =>
    meta
      ? console.log(`[${requestId}] ${step} - ${msg}`, meta)
      : console.log(`[${requestId}] ${step} - ${msg}`);

  const error = (step: string, msg: string, meta?: Record<string, unknown>) =>
    meta
      ? console.error(`[${requestId}] ${step} - ${msg}`, meta)
      : console.error(`[${requestId}] ${step} - ${msg}`);

  try {
    // Step 0: Request received
    log("Step 0", "Request received", {
      method: req.method,
      origin: req.headers.get("origin") ?? "",
    });

    // Step 1: Handle browser CORS preflight
    // BA note: Browsers call OPTIONS before POST in cross-domain scenarios.
    if (req.method === "OPTIONS") {
      log("Step 1", "OPTIONS preflight - returning 204");
      return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
    }

    // Step 2: Enforce POST only
    if (req.method !== "POST") {
      error("Step 2", "Method not allowed", { method: req.method });
      return json(req, 405, { error: "Method not allowed" });
    }
    log("Step 2", "Method is POST");

    // Step 3: Load configuration (secrets come from environment variables)
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const POSTMARK_TOKEN = Deno.env.get("POSTMARK_SERVER_TOKEN") ?? "";

    // Where the user lands in your front-end
    const APP_BASE_URL =
      (Deno.env.get("APP_BASE_URL") ?? "https://www.stockownerreport.com").replace(/\/$/, "");
    const SET_PASSWORD_PATH = Deno.env.get("SET_PASSWORD_PATH") ?? "/set-password";

    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") ?? "howard@stockownerreport.com";

    log("Step 3", "Loaded env vars", {
      hasSupabaseUrl: Boolean(SUPABASE_URL),
      hasServiceRoleKey: Boolean(SERVICE_ROLE_KEY),
      hasPostmarkToken: Boolean(POSTMARK_TOKEN),
      appBaseUrl: APP_BASE_URL,
      setPasswordPath: SET_PASSWORD_PATH,
      fromEmail: FROM_EMAIL,
    });

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !POSTMARK_TOKEN) {
      error("Step 3", "Missing required environment variables");
      return json(req, 500, {
        error:
          "Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / POSTMARK_SERVER_TOKEN",
      });
    }

    // Step 4: Parse input
    // BA note: Caller sends JSON like { "email": "user@example.com" }
    log("Step 4", "Parsing request body");
    const body = (await req.json().catch((e) => {
      error("Step 4", "Invalid JSON body", { message: String(e?.message ?? e) });
      return null;
    })) as { email?: unknown } | null;

    const email = String(body?.email ?? "").trim();
    if (!email) {
      error("Step 4", "Missing email");
      return json(req, 400, { error: "Missing email" });
    }
    log("Step 4", "Email received", { email });

    // Step 5: Generate token + expiry
    // BA note: Token is time-limited; the set-password page will validate it.
    log("Step 5", "Generating token and expiry");
    const token = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    const expires_at = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 minutes
    log("Step 5", "Token generated", {
      tokenPrefix: String(token).slice(0, 8), // do not log full token
      expires_at,
    });

    // Step 6: Save token in DB (upsert by email)
    // BA note: If the user requests multiple times, we overwrite old token with a new one.
    log("Step 6", "Saving token (upsert) in password_reset_tokens");
    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    // IMPORTANT: This is simplest if password_reset_tokens.email is UNIQUE.
    const upsertRes = await supabase
      .from("password_reset_tokens")
      .upsert({ email, token, expires_at }, { onConflict: "email" });

    if (upsertRes.error) {
      error("Step 6", "Upsert failed", { message: upsertRes.error.message });
      return json(req, 500, { error: "Could not save token" });
    }
    log("Step 6", "Token saved");

    // Step 7: Build tokenized URL
    log("Step 7", "Building tokenized URL");
    const tokenizedUrl = `${APP_BASE_URL}${SET_PASSWORD_PATH}?token=${encodeURIComponent(token)}`;
    log("Step 7", "Tokenized URL built", {
      // don't log the full URL with token
      urlPreview: `${APP_BASE_URL}${SET_PASSWORD_PATH}`,
    });

    // Step 8: Email the link via Postmark
    log("Step 8", "Sending email via Postmark");
    const postmarkResp = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": POSTMARK_TOKEN,
      },
      body: JSON.stringify({
        From: FROM_EMAIL,
        To: email,
        Subject: "Set up your password - Stock Owner Report",
        HtmlBody: `
          <div style="font-family: Arial, sans-serif; line-height:1.5">
            <h2>Set up your password</h2>
            <p>Click the link below to set up (or reset) your password:</p>
            <p><a href="${tokenizedUrl}" target="_blank" rel="noreferrer">Set up my password</a></p>
            <p>This link expires in 30 minutes.</p>
            <p>If you didn’t request this, you can ignore this email.</p>
          </div>
        `,
        TextBody:
          `Set up your password\n\n` +
          `Use this link (expires in 30 minutes):\n${tokenizedUrl}\n\n` +
          `If you didn’t request this, ignore this email.`,
        MessageStream: "outbound",
      }),
    });

    log("Step 8", "Postmark responded", { ok: postmarkResp.ok, status: postmarkResp.status });

    if (!postmarkResp.ok) {
      const bodyText = await postmarkResp.text().catch(() => "");
      error("Step 8", "Postmark failed", {
        status: postmarkResp.status,
        bodyPreview: bodyText.slice(0, 300),
      });
      return json(req, 500, { error: "Email send failed" });
    }

    // Step 9: Return success
    log("Step 9", "Success - returning response");
    return json(req, 200, { success: true, tokenizedUrl });
  } catch (e) {
    error("Catch", "Unhandled exception", {
      message: String(e?.message ?? e),
      stack: (e as { stack?: string })?.stack,
    });
    return json(req, 500, { error: "Unhandled server error" });
  }
});
