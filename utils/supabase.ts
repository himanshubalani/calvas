
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
	supabaseUrl!, //this might cause problems down the line so remove ! if you want to check for null or undefined
	supabaseKey!
);
        