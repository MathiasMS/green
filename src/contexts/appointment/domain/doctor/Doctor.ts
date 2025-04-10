export type Doctor = {
  id: string;
  firstName: string;
  lastName: string;
  rating?: number;
  title: string;
  specializations: string;
  fullAddress: string;
  consultationType: string;
  firstConsultationFee: number;
  nextAvailableSlot: Date;
};

export type DoctorSearchParams = {
  state: string;
  specializationId: string;
};

export interface DoctorRepository {
  getAll: (params?: DoctorSearchParams) => Promise<Doctor[]>;
  // findById: (id: string) => Promise<Doctor>;
}
