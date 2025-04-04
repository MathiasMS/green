import React, { createContext, useContext, useState } from 'react';
import { Doctor } from '@/src/contexts/profile/domain/doctor/Doctor';
import { Office } from '@/src/contexts/profile/domain/office/Office';
import { OfficeDoctorAvailability } from '@/src/contexts/profile/domain/officeDoctorAvailability/OfficeDoctorAvailability';
import { Specialization } from '@/src/contexts/profile/domain/specialization/Specialization';

interface OnboardingContextType {
  doctorData: Doctor | null;
  setDoctorData: (data: Doctor | null) => void;
  officeData: Office | null;
  setOfficeData: (data: Office | null) => void;
  scheduleData: OfficeDoctorAvailability[] | null;
  setScheduleData: (data: OfficeDoctorAvailability[] | null) => void;
  specializationData: Specialization[] | null;
  setSpecializationData: (data: Specialization[] | null) => void;
  clearOnboardingData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctorData, setDoctorData] = useState<Doctor | null>(null);
  const [officeData, setOfficeData] = useState<Office | null>(null);
  const [scheduleData, setScheduleData] = useState<OfficeDoctorAvailability[] | null>(null);
  const [specializationData, setSpecializationData] = useState<Specialization[] | null>(null);

  const clearOnboardingData = () => {
    setDoctorData(null);
    setOfficeData(null);
    setScheduleData(null);
    setSpecializationData(null);
  };

  return (
    <OnboardingContext.Provider
      value={{
        doctorData,
        setDoctorData,
        officeData,
        setOfficeData,
        scheduleData,
        setScheduleData,
        specializationData,
        setSpecializationData,
        clearOnboardingData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
