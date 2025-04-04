import {
  Doctor,
  DoctorParams,
  DoctorRepository,
  createDoctor,
} from '@/src/contexts/profile/domain/doctor/Doctor';

interface DoctorService {
  create: (data: DoctorParams) => Promise<Doctor>;
  update: (id: string, data: DoctorParams) => Promise<Doctor>;
  findById: (id: string) => Promise<Doctor>;
}

type Dependencies = {
  doctorRepository: DoctorRepository;
};

export default ({ doctorRepository }: Dependencies): DoctorService => ({
  create: async (data: DoctorParams): Promise<Doctor> => {
    try {
      const doctor = createDoctor(data);

      return await doctorRepository.create(doctor);
    } catch (e) {
      throw e;
    }
  },

  update: async (id: string, data: DoctorParams): Promise<Doctor> => {
    try {
      const doctor = createDoctor(data);
      return await doctorRepository.update(id, doctor);
    } catch (e) {
      throw e;
    }
  },

  findById: async (id: string): Promise<Doctor> => {
    try {
      return await doctorRepository.findById(id);
    } catch (e) {
      throw e;
    }
  },
});
