import {
  Doctor,
  DoctorRepository,
  DoctorSearchParams,
} from '@/src/contexts/appointment/domain/doctor/Doctor';
import { supabase } from '@/src/lib/supabase';

// Define the shape of data as it exists in Supabase
type SupabaseDoctor = {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  fullAddress: string;
  consultationType: string;
  firstConsultationFee: number;
  nextAvailableSlot: Date;
  specializations: string;
};

// Map from persistence to domain model
const toDomainModel = (data: SupabaseDoctor): Doctor => ({
  id: data.id,
  firstName: data.firstName,
  lastName: data.lastName,
  title: data.title,
  specializations: data.specializations,
  fullAddress: data.fullAddress,
  consultationType: data.consultationType,
  firstConsultationFee: data.firstConsultationFee,
  nextAvailableSlot: data.nextAvailableSlot,
});

export default (): DoctorRepository => ({
  getAll: async (params?: DoctorSearchParams): Promise<Doctor[]> => {
    try {
      const { data, error } = await supabase.rpc('get_doctors_by_specialization_and_state', {
        input_specialization_id: params?.specializationId,
        input_state: params?.state,
      });

      if (error) throw error;

      if (!data || data.length === 0) {
        throw new Error('No doctors returned from Supabase');
      }

      const doctors = data.map((doctor: SupabaseDoctor) => {
        return toDomainModel(doctor);
      });

      return doctors;
    } catch (e) {
      console.error('Error fetching doctors', e);
      throw e;
    }
  },

  // findById: async (id: string): Promise<Doctor> => {
  //   const { data, error } = await supabase
  //     .from('doctors')
  //     .select(
  //       `
  //       *,
  //       doctor_specialization (
  //         specializationId
  //       )
  //     `
  //     )
  //     .eq('id', id)
  //     .single();

  //   if (error) throw error;
  //   if (!data) throw new Error('Doctor not found');

  //   const specializations = data.doctor_specialization?.map((ds: any) => ds.specializationId) || [];

  //   return {
  //     ...toDomainModel(data),
  //     specializations,
  //   };
  // },
});
