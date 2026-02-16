import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = new Set([
  "http://localhost:3000",
  "https://www.stockownerreport.com",
]);

function buildCorsHeaders(req: Request): HeadersInit {
  const origin = req.headers.get("origin") ?? "";
  const isAllowed = origin && ALLOWED_ORIGINS.has(origin);

  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };

  if (isAllowed) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}

function json(req: Request, status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...buildCorsHeaders(req),
      "Content-Type": "application/json",
    },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: buildCorsHeaders(req) });
  }

  if (req.method !== "POST") {
    return json(req, 405, { error: "Method not allowed" });
  }

  const originHeader = req.headers.get("origin") ?? "";
  if (originHeader && !ALLOWED_ORIGINS.has(originHeader)) {
    return json(req, 403, { error: "Origin not allowed" });
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return json(req, 500, { error: "Missing server configuration" });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  let token = "";
  let passwordHash = "";
  try {
    const body = await req.json();
    token = String(body?.token ?? "").trim();
    passwordHash = String(body?.passwordHash ?? "").trim();
  } catch {
    return json(req, 400, { error: "Invalid request body" });
  }

  if (!token || !passwordHash) {
    return json(req, 400, { error: "Missing token or passwordHash" });
  }

  const { data: tokenRow, error: tokenError } = await supabase
    .from("password_reset_tokens")
    .select("email, expires_at")
    .eq("token", token)
    .single();

  if (tokenError || !tokenRow) {
    return json(req, 400, { error: "Token is invalid or expired" });
  }

  if (new Date(tokenRow.expires_at) < new Date()) {
    await supabase.from("password_reset_tokens").delete().eq("token", token);
    return json(req, 400, { error: "Token is invalid or expired" });
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({ password_hash: passwordHash })
    .eq("email", tokenRow.email);

  if (updateError) {
    return json(req, 500, { error: "Could not update password" });
  }

  await supabase.from("password_reset_tokens").delete().eq("token", token);

  return json(req, 200, { success: true });
});
