import { Doctor, DoctorRepository } from '@/src/contexts/profile/domain/doctor/Doctor';
import { supabase } from '@/src/lib/supabase';

// Define the shape of data as it exists in Supabase
type SupabaseDoctor = {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  title: string;
  professionalStatement: string | null;
  practicingFrom: string | null;
  birthDate: string;
  phone: string;
};

// Map from domain to persistence model
const toPersistenceModel = (doctor: Doctor): SupabaseDoctor => ({
  id: doctor.id,
  userId: doctor.userId,
  firstName: doctor.firstName,
  lastName: doctor.lastName,
  title: doctor.title,
  professionalStatement: doctor.professionalStatement,
  practicingFrom: doctor.practicingFrom?.toISOString() || null,
  birthDate: doctor.birthDate.toISOString(),
  phone: doctor.phone,
});

// Map from persistence to domain model
const toDomainModel = (data: SupabaseDoctor): Doctor => ({
  id: data.id,
  userId: data.userId,
  firstName: data.firstName,
  lastName: data.lastName,
  title: data.title,
  professionalStatement: data.professionalStatement,
  practicingFrom: data.practicingFrom ? new Date(data.practicingFrom) : null,
  birthDate: new Date(data.birthDate),
  phone: data.phone,
});

export default (): DoctorRepository => ({
  create: async (doctor: Doctor): Promise<Doctor> => {
    // Map to persistence model and persist
    const persistenceData = toPersistenceModel(doctor);

    const { data, error } = await supabase.from('doctors').insert(persistenceData).select();

    if (error) throw error;

    if (!data || data.length === 0) {
      throw new Error('No doctor returned from Supabase');
    }

    // Map the persisted data back to domain model
    return toDomainModel(data[0]);
  },

  findById: async (id: string): Promise<Doctor> => {
    const { data, error } = await supabase.from('doctors').select().eq('id', id).single();

    if (error) throw error;
    if (!data) throw new Error('Doctor not found');

    return toDomainModel(data);
  },

  update: async (id: string, doctor: Doctor): Promise<Doctor> => {
    const persistenceData = toPersistenceModel(doctor);

    const { data, error } = await supabase
      .from('doctors')
      .update(persistenceData)
      .eq('id', id)
      .select()
      .single();

    console.log('data', { data });
    if (error) throw error;
    if (!data) throw new Error('Doctor not found');

    return toDomainModel(data);
  },
});
