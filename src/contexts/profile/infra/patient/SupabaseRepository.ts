import { Patient, PatientRepository } from '@/src/contexts/profile/domain/patient/Patient';
import { supabase } from '@/src/lib/supabase';

// Define the shape of data as it exists in Supabase
type SupabasePatient = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  birthDate: string;
};

// Map from domain to persistence model
const toPersistenceModel = (patient: Patient): SupabasePatient => ({
  id: patient.id,
  userId: patient.userId,
  firstName: patient.firstName,
  lastName: patient.lastName,
  phone: patient.phone,
  streetAddress: patient.streetAddress,
  city: patient.city,
  state: patient.state,
  zip: patient.zip,
  birthDate: patient.birthDate.toISOString(),
});

// Map from persistence to domain model
const toDomainModel = (data: SupabasePatient): Patient => ({
  id: data.id,
  userId: data.userId,
  firstName: data.firstName,
  lastName: data.lastName,
  phone: data.phone,
  streetAddress: data.streetAddress,
  city: data.city,
  state: data.state,
  zip: data.zip,
  birthDate: new Date(data.birthDate),
});

export default (): PatientRepository => ({
  create: async (patient: Patient): Promise<Patient> => {
    // Map to persistence model and persist
    const persistenceData = toPersistenceModel(patient);

    console.log('persistenceData', persistenceData);

    const { data, error } = await supabase.from('patients').insert(persistenceData).select();

    console.log('DATA', data);
    console.log('ERROR', error);
    if (error) throw error;

    if (!data || data.length === 0) {
      throw new Error('No patient returned from Supabase');
    }

    // Map the persisted data back to domain model
    return toDomainModel(data[0]);
  },

  findById: async (id: string): Promise<Patient> => {
    const { data, error } = await supabase.from('patient').select().eq('id', id).single();

    if (error) throw error;
    if (!data) throw new Error('Patient not found');

    return toDomainModel(data);
  },
});
