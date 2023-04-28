import { createClient } from "@supabase/supabase-js";

export const logout = async () => {

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const logout = await supabase.auth.signOut();
}
