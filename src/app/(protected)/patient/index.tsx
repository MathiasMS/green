import { AppButton } from '@/src/components/ui';
import { AppHeading, AppLayout } from '@/src/components/ui';
import { useAuth } from '@/src/hooks/useAuth';

const PatientScreen = () => {
  const { signOut } = useAuth();
  return (
    <AppLayout>
      <AppHeading>Paciente</AppHeading>
      <AppButton onPress={() => signOut()} title="Cerrar sesion" />
    </AppLayout>
  );
};

export default PatientScreen;
