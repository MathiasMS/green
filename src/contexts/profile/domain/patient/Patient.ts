export type Patient = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  birthDate: Date;
};

export type PatientParams = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  birthDate: Date;
};

export const createPatient = ({
  id,
  userId,
  firstName,
  lastName,
  streetAddress,
  state,
  city,
  zip,
  phone,
  birthDate,
}: PatientParams): Patient => {
  const patient: Patient = {
    id,
    userId,
    firstName,
    lastName,
    streetAddress,
    state,
    city,
    zip,
    phone,
    birthDate,
  };

  validatePatient(patient);

  return patient;
};

const validatePatient = (patient: Patient): void => {
  if (!patient.firstName) throw new Error('First name is required.');
  if (!patient.lastName) throw new Error('Last name is required.');
  if (!patient.birthDate) throw new Error('Birth date is required.');
};

export interface PatientRepository {
  create: (patient: Patient) => Promise<Patient>;
  findById: (id: string) => Promise<Patient>;
}
