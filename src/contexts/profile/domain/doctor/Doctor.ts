export type Doctor = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  title: string;
  professionalStatement: string | null;
  practicingFrom: Date | null;
  birthDate: Date;
  phone: string;
};

export type DoctorParams = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  title: string;
  professionalStatement: string | null;
  practicingFrom: Date | null;
  birthDate: Date;
  phone: string;
};

export const createDoctor = ({
  id,
  userId,
  firstName,
  lastName,
  title,
  professionalStatement,
  practicingFrom,
  birthDate,
  phone,
}: DoctorParams): Doctor => {
  const doctor: Doctor = {
    id,
    userId,
    firstName,
    lastName,
    title,
    professionalStatement,
    practicingFrom,
    birthDate,
    phone,
  };

  validateDoctor(doctor);

  return doctor;
};

const validateDoctor = (doctor: Doctor): void => {
  if (!doctor.firstName) throw new Error('First name is required.');
  if (!doctor.lastName) throw new Error('Last name is required.');
  if (!doctor.birthDate) throw new Error('Birth date is required.');
  if (!doctor.phone) throw new Error('Phone is required.');
};

export interface DoctorRepository {
  create: (data: Doctor) => Promise<Doctor>;
  update: (id: string, data: Doctor) => Promise<Doctor>;
  findById: (id: string) => Promise<Doctor>;
}
