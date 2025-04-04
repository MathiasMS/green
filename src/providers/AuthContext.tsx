import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { AppState } from 'react-native';
import authService from '@/src/contexts/auth/container';
import { Patient } from '@/src/contexts/profile/domain/patient/Patient';
import { Doctor } from '@/src/contexts/profile/domain/doctor/Doctor';
import { useRouter } from 'expo-router';

export enum ProfileType {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
}

type AuthStateType = {
  session: Session | null;
  profile: Patient | Doctor | null;
  user: User | null;
  profileType: ProfileType | null;
  isLoading: boolean;
};

interface AuthContextType {
  authState: AuthStateType;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setProfileType: (type: ProfileType) => void;
}

const INITIAL_AUTH_STATE: AuthStateType = {
  session: null,
  profile: null,
  user: null,
  profileType: null,
  isLoading: true,
};

export const AuthContext = createContext<AuthContextType | undefined>({
  authState: INITIAL_AUTH_STATE,
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  setProfileType: () => {},
});

AppState.addEventListener('change', state => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthStateType>(INITIAL_AUTH_STATE);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        setAuthState(authState => ({
          ...authState,
          session,
          user: session?.user || null,
          isLoading: session ? true : false,
        }));
        if (session) fetchProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state change event:', { event: _event, session });
      if (isMounted) {
        console.log('Current auth state before update:', authState);
        setAuthState(authState => {
          const newState = {
            ...authState,
            session,
            user: session?.user || null,
            isLoading: session ? true : false,
          };
          return newState;
        });
        if (session) fetchProfile(session.user.id);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = useCallback(async (userId: string) => {
    // try {
    // Try to fetch from patients table first
    let { data: patientData, error: patientError } = await supabase
      .from('patients')
      .select('*')
      .eq('userId', userId)
      .single();

    // if (patientError && patientError.code === 'PGRST116') {
    if (!patientData) {
      // If not found in patients, try doctors table
      const { data: doctorData, error: doctorError } = await supabase
        .from('doctors')
        .select('*')
        .eq('userId', userId)
        .single();

      if (doctorError) {
        console.error('Error fetching profile:', doctorError);
        setAuthState(authState => ({
          ...authState,
          profile: null,
          profileType: null,
          isLoading: false,
        }));
      } else {
        setAuthState(authState => ({
          ...authState,
          profile: doctorData,
          profileType: ProfileType.DOCTOR,
          isLoading: false,
        }));
      }
    } else if (patientError) {
      console.error('Error fetching profile:', patientError);
      setAuthState(authState => ({
        ...authState,
        profile: null,
        profileType: null,
        isLoading: false,
      }));
    } else {
      setAuthState(authState => ({
        ...authState,
        profile: patientData,
        profileType: ProfileType.PATIENT,
        isLoading: false,
      }));
    }
  }, []);

  const setProfileType = useCallback((type: ProfileType) => {
    setAuthState(prev => ({ ...prev, profileType: type }));
  }, []);

  async function signUp(email: string, password: string) {
    try {
      const user = await authService.signUp({ email, password });
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const user = await authService.signIn({ email, password });
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  }

  async function signOut() {
    try {
      console.log('Starting sign out process');
      await authService.signOut();
      router.replace('/');
    } catch (e) {
      console.log('Error during sign out:', e);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        authState: {
          session: authState.session,
          profile: authState.profile,
          user: authState.user,
          profileType: authState.profileType,
          isLoading: authState.isLoading,
        },
        signUp,
        signIn,
        signOut,
        setProfileType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
