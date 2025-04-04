import { AppButton } from '@/src/components/ui';
import { AppHeading, AppLayout } from '@/src/components/ui';
import { useAuth } from '@/src/hooks/useAuth';

const DoctorScreen = () => {
  const { signOut } = useAuth();
  return (
    <AppLayout>
      <AppHeading>Doctor</AppHeading>
      <AppButton onPress={() => signOut()} title="Cerrar sesion" />
    </AppLayout>
  );
};

export default DoctorScreen;
