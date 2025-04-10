import makeSpecializationService from '@/src/contexts/profile/app/specialization/service';
import makeSupabaseSpecializationRepository from '@/src/contexts/profile/infra/specialization/SupabaseRepository';
import makeDoctorService from '@/src/contexts/appointment/app/doctor/service';
import makeSupabaseDoctorRepository from '@/src/contexts/appointment/infra/doctor/SupabaseRepository';

const specializationService = makeSpecializationService({
  specializationRepository: makeSupabaseSpecializationRepository(),
});

const doctorService = makeDoctorService({
  doctorRepository: makeSupabaseDoctorRepository(),
});

export { specializationService, doctorService };
