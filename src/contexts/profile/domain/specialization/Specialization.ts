export type Specialization = {
  id: string;
  name: string;
};

export type SpecializationParams = {
  id: string;
  name: string;
};

export type DoctorSpecialization = {
  doctorId: string;
  specializationId: string;
};

export type DoctorSpecializationParams = {
  doctorId: string;
  specializationId: string;
};

export const createSpecialization = ({ id, name }: SpecializationParams): Specialization => {
  const specialization: Specialization = {
    id,
    name,
  };

  // validateSpecialization(specialization);
  return specialization;
};

export const createDoctorSpecialization = ({
  doctorId,
  specializationId,
}: DoctorSpecializationParams): DoctorSpecialization => {
  const doctorSpecialization: DoctorSpecialization = {
    doctorId,
    specializationId,
  };

  // validateDoctorSpecialization(doctorSpecialization);
  return doctorSpecialization;
};
