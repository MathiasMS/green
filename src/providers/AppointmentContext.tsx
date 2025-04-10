import { createContext, useContext, useState, ReactNode } from 'react';

type Specialization = {
  id: string;
  name: string;
};

type AppointmentContextType = {
  location: string;
  setLocation: (location: string) => void;
  specialization: Specialization;
  setSpecialization: (specialization: Specialization) => void;
  resetState: () => void;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

const initialSpecialization: Specialization = {
  id: '',
  name: '',
};

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState('');
  const [specialization, setSpecialization] = useState<Specialization>(initialSpecialization);

  const resetState = () => {
    setLocation('');
    setSpecialization(initialSpecialization);
  };

  return (
    <AppointmentContext.Provider
      value={{
        location,
        setLocation,
        specialization,
        setSpecialization,
        resetState,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};
