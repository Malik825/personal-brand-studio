import { createClient } from "@supabase/supabase-js";

const getEnv = (key: string): string | undefined => {
  if (typeof import.meta !== "undefined" && import.meta.env?.[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== "undefined" && process.env?.[key]) {
    return process.env[key];
  }
  return undefined;
};

const supabaseUrl =
  getEnv("VITE_SUPABASE_URL") ||
  getEnv("SUPABASE_URL") ||
  "https://c--dcb5a1bb-bc54-42e7-9a8d-d1af72f95a24-prod.lovable.cloud";

const supabaseAnonKey =
  getEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ||
  getEnv("SUPABASE_PUBLISHABLE_KEY") ||
  getEnv("VITE_SUPABASE_ANON_KEY") ||
  getEnv("SUPABASE_ANON_KEY") ||
  "sb_publishable_Pvzch0HCJ8Grxv6mboaHfg_LUmNrGhG";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
