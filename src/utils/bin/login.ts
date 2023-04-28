import { createClient } from '@supabase/supabase-js';


export const login = async (args: string[]): Promise<string> => {
  return ''
}

const getAlias = (email: string): string => {
  if (email === null || email === undefined) {
    return null;
  }
  return email.split('@')[0];
}

export const loginUser = async (username: string, password: string): Promise<Login> => {

  const userLogged: Login = {};

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: userData } = await supabase.auth.signInWithPassword({
    email: username,
    password: password,
  })

  if (userData !== null && userData.user !== null && userData.user.aud === 'authenticated') {

    userLogged.username = userData.user.email;
    userLogged.alias = getAlias(userData.user.email)
    userLogged.isLogged = true;
  }

  return userLogged;
}

export const getLoggedUser = async (): Promise<Login> => {
  const userLogged: Login = {};
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const user = await supabase.auth.getUser();
  if (user !== null && user.data !== null && user.data.user !== null && user.data.user.aud === 'authenticated') {
    userLogged.username = user.data.user.email;
    userLogged.alias = getAlias(user.data.user.email)
    userLogged.isLogged = true;
  }
  return userLogged;
}

export interface Login {
  username?: string;
  password?: string;
  alias?: string;
  isLogged?: boolean;
}
