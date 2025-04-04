export type Office = {
  id: string;
  doctorId: string;
  consultationType: 'virtual' | 'presencial' | 'hibrido';
  streetAddress: string;
  apartment: string | null;
  zip: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  firstConsultationFee: number;
  timeSlotPerClientInMin: string;
};

export type OfficeParams = {
  id: string;
  doctorId: string;
  consultationType: 'virtual' | 'presencial' | 'hibrido';
  streetAddress: string;
  apartment: string | null;
  zip: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  firstConsultationFee: number;
  timeSlotPerClientInMin: string;
};
export const createOffice = ({
  id,
  doctorId,
  consultationType,
  streetAddress,
  apartment,
  zip,
  city,
  state,
  phone,
  email,
  firstConsultationFee,
  timeSlotPerClientInMin,
}: OfficeParams): Office => {
  const office: Office = {
    id,
    doctorId,
    consultationType,
    streetAddress,
    apartment,
    zip,
    city,
    state,
    phone,
    email,
    firstConsultationFee,
    timeSlotPerClientInMin,
  };

  validateOffice(office);

  return office;
};

const validateOffice = (office: Office): void => {
  if (!office.doctorId) throw new Error('Doctor ID is required.');
  if (!office.streetAddress) throw new Error('Street address is required.');
  if (!office.zip) throw new Error('ZIP code is required.');
  if (!office.city) throw new Error('City is required.');
  if (!office.state) throw new Error('State is required.');
  if (!office.phone) throw new Error('Phone is required.');
  if (!office.email) throw new Error('Email is required.');
  // if (!office.firstConsultationFee) throw new Error('First consultation fee is required.');
  if (!office.timeSlotPerClientInMin)
    throw new Error('Time slot per client in minutes is required.');
};

export interface OfficeRepository {
  create: (data: Office) => Promise<Office>;
  findByDoctorId: (doctorId: string) => Promise<Office | null>;
  update: (id: string, data: Office) => Promise<Office>;
}
