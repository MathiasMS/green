import makePatientService from '@/src/contexts/profile/app/patient/service';
import supabasePatientRepository from '@/src/contexts/profile/infra/patient/SupabaseRepository';

import makeDoctorService from '@/src/contexts/profile/app/doctor/service';
import supabaseDoctorRepository from '@/src/contexts/profile/infra/doctor/SupabaseRepository';

import makeOfficeService from '@/src/contexts/profile/app/office/service';
import supabaseOfficeRepository from '@/src/contexts/profile/infra/office/SupabaseRepository';

import makeOfficeDoctorAvailabilityService from '@/src/contexts/profile/app/officeDoctorAvailability/service';
import supabaseOfficeDoctorAvailabilityRepository from '@/src/contexts/profile/infra/officeDoctorAvailability/SupabaseRepository';

import makeSpecializationService from '@/src/contexts/profile/app/specialization/service';
import makeSupabaseSpecializationRepository from '@/src/contexts/profile/infra/specialization/SupabaseRepository';

const patientService = makePatientService({
  patientRepository: supabasePatientRepository(),
});

const doctorService = makeDoctorService({
  doctorRepository: supabaseDoctorRepository(),
});

const officeService = makeOfficeService({
  officeRepository: supabaseOfficeRepository(),
});

const officeDoctorAvailabilityService = makeOfficeDoctorAvailabilityService({
  officeDoctorAvailabilityRepository: supabaseOfficeDoctorAvailabilityRepository(),
});

const specializationService = makeSpecializationService({
  specializationRepository: makeSupabaseSpecializationRepository(),
});

export {
  patientService,
  doctorService,
  officeService,
  officeDoctorAvailabilityService,
  specializationService,
};
