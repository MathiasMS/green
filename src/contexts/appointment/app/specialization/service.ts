import { Specialization } from '../../domain/specialization/Specialization';

interface SpecializationService {
  findAll: () => Promise<Specialization[]>;
}

type Dependencies = {
  specializationRepository: {
    findAll: () => Promise<Specialization[]>;
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
});
