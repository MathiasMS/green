import {
  Patient,
  PatientParams,
  PatientRepository,
  createPatient,
} from '@/src/contexts/profile/domain/patient/Patient';

interface PatientService {
  create: (data: PatientParams) => Promise<Patient>;
}

type Dependencies = {
  patientRepository: PatientRepository;
};

export default ({ patientRepository }: Dependencies): PatientService => ({
  create: async (data: PatientParams): Promise<Patient> => {
    try {
      // Create and validate the domain entity
      const patient = createPatient(data);

      console.log('ACA LLEGO');
      // Persist the validated entity
      return await patientRepository.create(patient);
    } catch (e) {
      throw e;
    }
  },
});
