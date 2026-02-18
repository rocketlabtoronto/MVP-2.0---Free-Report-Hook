import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/**
 * Purpose:
 * Send a password setup/reset email to a user.
 *
 * Flow:
 * 1) Browser calls this function with { email }.
 * 2) This function calls an internal function to generate a one-time setup link.
 * 3) This function emails the link via Postmark.
 */

const APP_BASE_URL = Deno.env.get("APP_BASE_URL").replace(/\/$/, "");
// If you call this from the browser, CORS is required.
const ALLOWED_ORIGINS = new Set(APP_BASE_URL ? [APP_BASE_URL] : []);

function buildCorsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get("origin") ?? "";
  const isAllowed = origin && ALLOWED_ORIGINS.has(origin);

  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };

  if (isAllowed) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function json(req: Request, status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" },
  });
}

// The internal function may return JSON { tokenizedUrl: "..." } or plain text "..."
function extractResetUrl(raw: string): string {
  try {
    const parsed = JSON.parse(raw);

    // Support the actual response shape you're getting:
    const candidate =
      parsed?.tokenizedUrl ??
      parsed?.resetUrl ??
      parsed?.url;

    if (candidate) return String(candidate).trim();

    // It was JSON, but not the expected shape
    return "";
  } catch {
    // Not JSON (plain text URL)
    return raw.trim();
  }
}

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// Avoid dumping full email into logs; keep it useful but safer.
function maskEmail(email: string): string {
  const at = email.indexOf("@");
  if (at <= 1) return "***";
  return `${email.slice(0, 2)}***${email.slice(at)}`;
}

// Avoid dumping full URLs (tokens) into logs; log only host + path.
function safeUrlForLogs(url: string): string {
  try {
    const u = new URL(url);
    return `${u.origin}${u.pathname}`;
  } catch {
    return "(invalid-url)";
  }
}

serve(async (req) => {
  const requestId = crypto.randomUUID?.() ?? `${Date.now()}`;

  const log = (step: string, message: string, meta?: Record<string, unknown>) => {
    if (meta) console.log(`[${requestId}] ${step} - ${message}`, meta);
    else console.log(`[${requestId}] ${step} - ${message}`);
  };

  const error = (
    step: string,
    message: string,
    meta?: Record<string, unknown>,
  ) => {
    if (meta) console.error(`[${requestId}] ${step} - ${message}`, meta);
    else console.error(`[${requestId}] ${step} - ${message}`);
  };

  // Try/catch over the entire handler (including preflight).
  try {
    // Step 0: Request received
    log("Step 0", "Request received", {
      method: req.method,
      origin: req.headers.get("origin") ?? "",
    });

    // Step 0.1: Handle CORS preflight (browser requirement)
    if (req.method === "OPTIONS") {
      log("Step 0.1", "Preflight OPTIONS request - returning 204");
      return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
    }

    // Step 1: Block calls from unapproved websites
    const originHeader = req.headers.get("origin") ?? "";
    if (originHeader && !ALLOWED_ORIGINS.has(originHeader)) {
      error("Step 1", "Origin not allowed", { origin: originHeader });
      return json(req, 403, { error: "Origin not allowed" });
    }
    log("Step 1", "Origin allowed (or server-to-server request)");

    // Step 2: Enforce POST only
    if (req.method !== "POST") {
      error("Step 2", "Method not allowed", { method: req.method });
      return json(req, 405, { error: "Method not allowed" });
    }
    log("Step 2", "Method is POST");

    // Step 3: Load required environment variables (do NOT log secret values)
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
    const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const POSTMARK_TOKEN = Deno.env.get("POSTMARK_SERVER_TOKEN") ?? "";
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL");

    log("Step 3", "Loaded environment variables", {
      hasSupabaseUrl: Boolean(SUPABASE_URL),
      hasServiceRoleKey: Boolean(SERVICE_ROLE_KEY),
      hasPostmarkToken: Boolean(POSTMARK_TOKEN),
      fromEmail: FROM_EMAIL,
    });

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !POSTMARK_TOKEN) {
      error("Step 3", "Missing required environment variables", {
        hasSupabaseUrl: Boolean(SUPABASE_URL),
        hasServiceRoleKey: Boolean(SERVICE_ROLE_KEY),
        hasPostmarkToken: Boolean(POSTMARK_TOKEN),
      });

      return json(req, 500, {
        error:
          "Server misconfiguration: missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / POSTMARK_SERVER_TOKEN",
      });
    }

    // Step 4: Parse request body and validate email
    log("Step 4", "Parsing request body");
    const payload = (await req.json().catch((e) => {
      error("Step 4", "Failed to parse JSON body", { message: String(e?.message ?? e) });
      return null;
    })) as { email?: unknown } | null;

    const email = String(payload?.email ?? "").trim();
    if (!email) {
      error("Step 4", "Missing email in request body");
      return json(req, 400, { error: "Missing email" });
    }
    log("Step 4", "Email received", { email: maskEmail(email) });

    // Calling internal function to generate and retrieve tokenized url
    log("Step 5", "Calling internal function to generate and retrieve tokenized url");

    const adminHeaders: HeadersInit = {
      "Content-Type": "application/json",
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    };

    const linkResp = await fetch(
      `${SUPABASE_URL}/functions/v1/create-and-get-tokenized-url`,
      {
        method: "POST",
        headers: adminHeaders,
        body: JSON.stringify({ email }),
      },
    ).catch((e) => {
      error("Step 5", "Network error calling internal reset-link function", {
        message: String(e?.message ?? e),
      });
      throw e; // jump to catch so we get one consistent failure path
    });

    log("Step 5", "Internal function responded", {
      status: linkResp.status,
      ok: linkResp.ok,
    });

    const linkText = await linkResp.text().catch((e) => {
      error("Step 5", "Failed reading internal function response body", {
        message: String(e?.message ?? e),
      });
      throw e;
    });

    if (!linkResp.ok) {
      // Log full details server-side; do NOT send internal details to browser.
      error("Step 5", "Internal reset-link function returned non-OK", {
        status: linkResp.status,
        bodyPreview: linkText.slice(0, 300),
      });
      return json(req, 500, { error: "Failed to generate password reset link" });
    }

    // Step 6: Parse and validate reset URL
    log("Step 6", "Extracting reset URL from internal response");
    const resetUrl = extractResetUrl(linkText);

    if (!resetUrl || !isHttpUrl(resetUrl)) {
      error("Step 6", "Invalid reset URL returned", {
        resetUrlPreview: safeUrlForLogs(resetUrl),
        bodyPreview: linkText.slice(0, 300),
      });
      return json(req, 500, { error: "Invalid reset link returned" });
    }

    log("Step 6", "Reset URL extracted", { url: safeUrlForLogs(resetUrl) });

    // Step 7: Send email via Postmark
    log("Step 7", "Sending email via Postmark", { to: maskEmail(email) });

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
  Subject: "Action required: Set your Stock Owner Report password",
  HtmlBody: `
    <div style="font-family: Arial, sans-serif; line-height:1.5; color:#111;">
      <p>Dear Customer,</p>

      <p>
        We received a request to create or reset the password for your Stock Owner Report account.
        To proceed, please use the secure link below:
      </p>

      <p>
        <a href="${resetUrl}" target="_blank" rel="noreferrer">Set your password</a>
      </p>

      <p>
        If you did not initiate this request, you may disregard this email. No changes will be made
        unless the link is used.
      </p>

      <p>Sincerely,<br/>Stock Owner Report Support</p>
    </div>
  `,
  TextBody:
    `Dear Customer,\n\n` +
    `We received a request to create or reset the password for your Stock Owner Report account.\n` +
    `To proceed, please use the secure link below:\n\n` +
    `${resetUrl}\n\n` +
    `If you did not initiate this request, you may disregard this email. No changes will be made unless the link is used.\n\n` +
    `Sincerely,\n` +
    `Stock Owner Report Support`,
  MessageStream: "outbound",
}),
    }).catch((e) => {
      error("Step 7", "Network error calling Postmark", {
        message: String(e?.message ?? e),
      });
      throw e;
    });

    log("Step 7", "Postmark responded", {
      status: postmarkResp.status,
      ok: postmarkResp.ok,
    });

    const postmarkText = await postmarkResp.text().catch((e) => {
      error("Step 7", "Failed reading Postmark response body", {
        message: String(e?.message ?? e),
      });
      throw e;
    });

    if (!postmarkResp.ok) {
      error("Step 7", "Postmark returned non-OK", {
        status: postmarkResp.status,
        bodyPreview: postmarkText.slice(0, 300),
      });
      return json(req, 500, { error: "Email delivery failed" });
    }

    // Step 8: Success
    log("Step 8", "Completed successfully");
    return json(req, 200, { success: true });
  } catch (err) {
    // Catch-all failure (ensures we always return CORS-safe JSON)
    error("Catch", "Unhandled exception", {
      message: String(err?.message ?? err),
      // stack can be useful; if undefined, it won’t show
      stack: (err as { stack?: string })?.stack,
    });

    return json(req, 500, { error: "Unhandled server error" });
  }
});
