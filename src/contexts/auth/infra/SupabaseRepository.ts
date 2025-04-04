/* @flow */
import { User, UserAuthInfo, UserRepository, createUser } from '../domain/User';
import { supabase } from '@/src/lib/supabase';

export default (): UserRepository => ({
  signUp: async ({ email, password }: UserAuthInfo): Promise<User> => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    console.log('data', data);
    console.log('error', error);
    if (error) throw error;

    if (!data.user) {
      throw new Error('No user returned from Supabase');
    }

    return createUser({ id: data.user.id, email, password });
  },
  signIn: async ({ email, password }: UserAuthInfo): Promise<User> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return createUser({ id: data.user.id, email, password });
  },
  logout: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  },
});
