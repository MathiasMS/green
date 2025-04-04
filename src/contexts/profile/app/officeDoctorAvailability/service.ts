import { v4 as uuidv4 } from 'uuid';
import {
  OfficeDoctorAvailability,
  OfficeDoctorAvailabilityParams,
  OfficeDoctorAvailabilityRepository,
  createOfficeDoctorAvailability,
} from '../../domain/officeDoctorAvailability/OfficeDoctorAvailability';

interface OfficeDoctorAvailabilityService {
  create: (data: Omit<OfficeDoctorAvailabilityParams, 'id'>) => Promise<OfficeDoctorAvailability>;
  createMany: (
    data: Omit<OfficeDoctorAvailabilityParams, 'id'>[]
  ) => Promise<OfficeDoctorAvailability[]>;
  findByOfficeId: (officeId: string) => Promise<OfficeDoctorAvailability[]>;
  deleteByOfficeId: (officeId: string) => Promise<void>;
  update: (
    id: string,
    data: Omit<OfficeDoctorAvailabilityParams, 'id'>
  ) => Promise<OfficeDoctorAvailability>;
}

type Dependencies = {
  officeDoctorAvailabilityRepository: OfficeDoctorAvailabilityRepository;
};

export default ({
  officeDoctorAvailabilityRepository,
}: Dependencies): OfficeDoctorAvailabilityService => ({
  create: async (data): Promise<OfficeDoctorAvailability> => {
    try {
      const availability = createOfficeDoctorAvailability({
        ...data,
        id: uuidv4(),
      });

      return await officeDoctorAvailabilityRepository.create(availability);
    } catch (e) {
      throw e;
    }
  },

  createMany: async (data): Promise<OfficeDoctorAvailability[]> => {
    try {
      const availabilitiesWithIds = data.map(availability => ({
        ...availability,
        id: uuidv4(),
      }));
      console.log('availabilitiesWithIds', { availabilitiesWithIds });
      return await officeDoctorAvailabilityRepository.createMany(availabilitiesWithIds);
    } catch (e) {
      throw e;
    }
  },

  findByOfficeId: async (officeId: string): Promise<OfficeDoctorAvailability[]> => {
    try {
      return await officeDoctorAvailabilityRepository.findByOfficeId(officeId);
    } catch (e) {
      throw e;
    }
  },

  deleteByOfficeId: async (officeId: string): Promise<void> => {
    try {
      return await officeDoctorAvailabilityRepository.deleteByOfficeId(officeId);
    } catch (e) {
      throw e;
    }
  },

  update: async (
    id: string,
    data: Omit<OfficeDoctorAvailabilityParams, 'id'>
  ): Promise<OfficeDoctorAvailability> => {
    try {
      const availability = createOfficeDoctorAvailability({
        ...data,
        id,
      });
      return await officeDoctorAvailabilityRepository.update(id, availability);
    } catch (e) {
      throw e;
    }
  },
});
