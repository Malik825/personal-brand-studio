import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
  "https://c--dcb5a1bb-bc54-42e7-9a8d-d1af72f95a24-prod.lovable.cloud";

const supabaseAnonKey =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY) ||
  "sb_publishable_Pvzch0HCJ8Grxv6mboaHfg_LUmNrGhG";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
