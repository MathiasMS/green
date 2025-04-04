import { Specialization } from '../../domain/specialization/Specialization';

interface SpecializationService {
  findAll: () => Promise<Specialization[]>;
  findByDoctorId: (doctorId: string) => Promise<Specialization[]>;
  createDoctorSpecializations: (doctorId: string, specializationIds: string[]) => Promise<void>;
  deleteDoctorSpecializations: (doctorId: string) => Promise<void>;
}

type Dependencies = {
  specializationRepository: {
    findAll: () => Promise<Specialization[]>;
    findByDoctorId: (doctorId: string) => Promise<Specialization[]>;
    createDoctorSpecializations: (doctorId: string, specializationIds: string[]) => Promise<void>;
    deleteDoctorSpecializations: (doctorId: string) => Promise<void>;
  };
};

export default ({ specializationRepository }: Dependencies): SpecializationService => ({
  findAll: async (): Promise<Specialization[]> => {
    try {
      return await specializationRepository.findAll();
    } catch (e) {
      throw e;
    }
  },

  findByDoctorId: async (doctorId: string): Promise<Specialization[]> => {
    try {
      return await specializationRepository.findByDoctorId(doctorId);
    } catch (e) {
      throw e;
    }
  },

  createDoctorSpecializations: async (
    doctorId: string,
    specializationIds: string[]
  ): Promise<void> => {
    try {
      return await specializationRepository.createDoctorSpecializations(
        doctorId,
        specializationIds
      );
    } catch (e) {
      throw e;
    }
  },

  deleteDoctorSpecializations: async (doctorId: string): Promise<void> => {
    try {
      return await specializationRepository.deleteDoctorSpecializations(doctorId);
    } catch (e) {
      throw e;
    }
  },
});
