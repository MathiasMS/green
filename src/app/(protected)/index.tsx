import { Redirect } from 'expo-router';
import { useAuth } from '@/src/hooks/useAuth';
import { ProfileType } from '@/src/providers/AuthContext';
import { AppActivityIndicator } from '@/src/components/ui';

export default function ProtectedLayout() {
  const {
    authState: { session, profile, profileType, isLoading },
  } = useAuth();

  if (isLoading) {
    return <AppActivityIndicator />;
  }

  // If no session, redirect to auth
  if (!session) {
    return <Redirect href="/(auth)" />;
  }

  // If we have a session but no profile, user needs to create their profile
  if (!profile) {
    return <Redirect href="/onboarding" />;
  }

  // Redirect based on profile type
  if (profileType === ProfileType.DOCTOR) {
    return <Redirect href="/doctor" />;
  }

  if (profileType === ProfileType.PATIENT) {
    return <Redirect href="/patient" />;
  }

  // If somehow we have a profile but no profile type, redirect to onboarding
  return <Redirect href="/onboarding" />;
}
