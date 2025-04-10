import { supabase } from '@/src/lib/supabase';
import { Specialization } from '../../domain/specialization/Specialization';

// Define the shape of data as it exists in Supabase
type SupabaseSpecialization = {
  id: string;
  name: string;
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
});
