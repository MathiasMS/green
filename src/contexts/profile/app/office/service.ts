import {
  Office,
  OfficeParams,
  OfficeRepository,
  createOffice,
} from '@/src/contexts/profile/domain/office/Office';
import { v4 as uuidv4 } from 'uuid';

type Dependencies = {
  officeRepository: OfficeRepository;
};

const makeOfficeService = ({ officeRepository }: Dependencies) => ({
  create: async (officeParams: OfficeParams): Promise<Office> => {
    const office = createOffice(officeParams);

    return officeRepository.create(office);
  },

  findByDoctorId: async (doctorId: string): Promise<Office | null> => {
    return officeRepository.findByDoctorId(doctorId);
  },

  update: async (id: string, officeParams: OfficeParams): Promise<Office> => {
    const office = createOffice(officeParams);
    return officeRepository.update(id, office);
  },
});

export default makeOfficeService;
