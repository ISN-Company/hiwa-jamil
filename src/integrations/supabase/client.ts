// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rswkblvjoybsoqgrizwi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzd2tibHZqb3lic29xZ3JpendpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTIxMDEsImV4cCI6MjA2ODA2ODEwMX0.o42XytEUYE2WB__rRQCA3-lcil6JG2finXS0M45disI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});