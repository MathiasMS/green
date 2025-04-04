import { supabase } from '@/src/lib/supabase';
import {
  DayOfWeek,
  OfficeDoctorAvailability,
  OfficeDoctorAvailabilityParams,
  OfficeDoctorAvailabilityRepository,
} from '../../domain/officeDoctorAvailability/OfficeDoctorAvailability';

// Define the shape of data as it exists in Supabase
type SupabaseOfficeDoctorAvailability = {
  id: string;
  officeId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
};

// Map from domain to persistence model
const toPersistenceModel = (
  availability: OfficeDoctorAvailabilityParams
): SupabaseOfficeDoctorAvailability => ({
  id: availability.id,
  officeId: availability.officeId,
  dayOfWeek: availability.dayOfWeek,
  startTime: availability.startTime,
  endTime: availability.endTime,
  isAvailable: availability.isAvailable,
});

// Map from persistence to domain model
const toDomainModel = (data: SupabaseOfficeDoctorAvailability): OfficeDoctorAvailability => ({
  id: data.id,
  officeId: data.officeId,
  dayOfWeek: data.dayOfWeek,
  startTime: data.startTime,
  endTime: data.endTime,
  isAvailable: data.isAvailable || true,
});

export default (): OfficeDoctorAvailabilityRepository => ({
  create: async (
    availability: OfficeDoctorAvailabilityParams
  ): Promise<OfficeDoctorAvailability> => {
    const persistenceData = toPersistenceModel(availability);

    const { data, error } = await supabase
      .from('office_doctor_availability')
      .insert(persistenceData)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      throw new Error('No availability returned from Supabase');
    }

    return toDomainModel(data[0]);
  },

  createMany: async (
    availabilities: OfficeDoctorAvailabilityParams[]
  ): Promise<OfficeDoctorAvailability[]> => {
    const persistenceData = availabilities.map(toPersistenceModel);

    const { data, error } = await supabase
      .from('office_doctor_availability')
      .insert(persistenceData)
      .select();

    console.log('data', { data });
    console.log('error', { error });
    if (error) throw error;

    if (!data) {
      throw new Error('No availabilities returned from Supabase');
    }

    return data.map(toDomainModel);
  },

  findByOfficeId: async (officeId: string): Promise<OfficeDoctorAvailability[]> => {
    const { data, error } = await supabase
      .from('office_doctor_availability')
      .select()
      .eq('officeId', officeId);

    if (error) throw error;

    if (!data) return [];

    return data.map(toDomainModel);
  },

  deleteByOfficeId: async (officeId: string): Promise<void> => {
    const { error } = await supabase
      .from('office_doctor_availability')
      .delete()
      .eq('officeId', officeId);

    if (error) throw error;
  },

  update: async (
    id: string,
    availability: OfficeDoctorAvailabilityParams
  ): Promise<OfficeDoctorAvailability> => {
    const persistenceData = toPersistenceModel(availability);

    const { data, error } = await supabase
      .from('office_doctor_availability')
      .update(persistenceData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Availability not found');

    return toDomainModel(data);
  },
});
