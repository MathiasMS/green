import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://itlgrimfdarkcqnokxgb.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0bGdyaW1mZGFya2Nxbm9reGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0ODA0NjIsImV4cCI6MjA1ODA1NjQ2Mn0.N2-iP8K0sIAc4aSrS_fQQO32vXqD6AGNuVrCr4OhpwU';

const supabasePassword = 'wcdQiHL_L9DeW*a';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
