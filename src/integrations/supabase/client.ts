// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://drxftdivhztfstchygfp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyeGZ0ZGl2aHp0ZnN0Y2h5Z2ZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMzM4MzMsImV4cCI6MjA1MTYwOTgzM30.m6iNZqMeNCZ3BTiEA9xO9SBxe-op584Bp4cOV3R25hI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);