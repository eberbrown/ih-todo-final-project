const API_KEY = $VITE_SUPAKEY;
const PROJECT_URL = $VITE_SUPAURL;

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(PROJECT_URL, API_KEY);

