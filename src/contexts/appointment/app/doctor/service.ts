import {
  Doctor,
  DoctorRepository,
  DoctorSearchParams,
} from '@/src/contexts/appointment/domain/doctor/Doctor';

interface DoctorService {
  getAll: (params?: DoctorSearchParams) => Promise<Doctor[]>;
  // findById: (id: string) => Promise<Doctor>;
}

type Dependencies = {
  doctorRepository: DoctorRepository;
};

export default ({ doctorRepository }: Dependencies): DoctorService => ({
  getAll: async (params?: DoctorSearchParams): Promise<Doctor[]> => {
    try {
      return await doctorRepository.getAll(params);
    } catch (e) {
      throw e;
    }
  },

  // findById: async (id: string): Promise<Doctor> => {
  //   try {
  //     return await doctorRepository.findById(id);
  //   } catch (e) {
  //     throw e;
  //   }
  // },
});
