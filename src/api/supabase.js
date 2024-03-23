const API_KEY = import.meta.env.VITE_SUPAKEY;
const PROJECT_URL = import.meta.env.VITE_SUPAURL;

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(PROJECT_URL, API_KEY);

