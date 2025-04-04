import { supabase } from '@/src/lib/supabase';
import { Specialization } from '../../domain/specialization/Specialization';

// Define the shape of data as it exists in Supabase
type SupabaseSpecialization = {
  id: string;
  name: string;
};

type SupabaseSpecializationJoin = {
  specialization_id: string;
  specializations: {
    id: string;
    name: string;
  };
};

// Map from persistence to domain model
const toDomainModel = (data: SupabaseSpecialization): Specialization => ({
  id: data.id,
  name: data.name,
});

export default () => ({
  findAll: async (): Promise<Specialization[]> => {
    const { data, error } = await supabase.from('specializations').select('*');

    if (error) throw error;

    return (data || []).map(toDomainModel);
  },

  findByDoctorId: async (doctorId: string): Promise<Specialization[]> => {
    const { data, error } = await supabase
      .from('doctor_specialization')
      .select('specialization_id, specializations(*)')
      .eq('doctor_id', doctorId);

    if (error) throw error;

    return ((data as unknown as SupabaseSpecializationJoin[]) || []).map(item => ({
      id: item.specializations.id,
      name: item.specializations.name,
    }));
  },

  createDoctorSpecializations: async (
    doctorId: string,
    specializationIds: string[]
  ): Promise<void> => {
    const doctorSpecializations = specializationIds.map(specializationId => ({
      doctor_id: doctorId,
      specialization_id: specializationId,
    }));

    const { error } = await supabase.from('doctor_specialization').insert(doctorSpecializations);

    if (error) throw error;
  },

  deleteDoctorSpecializations: async (doctorId: string): Promise<void> => {
    const { error } = await supabase
      .from('doctor_specialization')
      .delete()
      .eq('doctor_id', doctorId);

    if (error) throw error;
  },
});
