import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getSupabaseAdmin() {
  if (!url || !serviceKey) {
    throw new Error("Supabase server konfiqurasiyası tapılmadı (env dəyişənləri əskikdir)");
  }
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function checkAdminSecret(request) {
  const secret = request.headers.get("x-admin-secret");
  return secret && secret === process.env.ADMIN_PASSWORD;
}
