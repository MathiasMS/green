import { Office, OfficeRepository } from '@/src/contexts/profile/domain/office/Office';
import { supabase } from '@/src/lib/supabase';

// Define the shape of data as it exists in Supabase
type SupabaseOffice = {
  id: string;
  doctorId: string;
  streetAddress: string;
  apartment: string | null;
  zip: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  firstConsultationFee: number;
  timeSlotPerClientInMin: string;
  consultationType: string;
};

// Map from domain to persistence model
const toPersistenceModel = (office: Office): SupabaseOffice => ({
  id: office.id,
  doctorId: office.doctorId,
  streetAddress: office.streetAddress,
  apartment: office.apartment,
  zip: office.zip,
  city: office.city,
  state: office.state,
  phone: office.phone,
  email: office.email,
  firstConsultationFee: office.firstConsultationFee,
  timeSlotPerClientInMin: office.timeSlotPerClientInMin,
  consultationType: office.consultationType,
});

// Map from persistence to domain model
const toDomainModel = (data: SupabaseOffice): Office => ({
  id: data.id,
  doctorId: data.doctorId,
  streetAddress: data.streetAddress,
  apartment: data.apartment,
  zip: data.zip,
  city: data.city,
  state: data.state,
  phone: data.phone,
  email: data.email,
  firstConsultationFee: data.firstConsultationFee,
  timeSlotPerClientInMin: data.timeSlotPerClientInMin,
  consultationType: data.consultationType as 'virtual' | 'presencial' | 'hibrido',
});

export default (): OfficeRepository => ({
  create: async (office: Office): Promise<Office> => {
    // Map to persistence model and persist
    const persistenceData = toPersistenceModel(office);

    console.log('persistenceData', { persistenceData });

    const { data, error } = await supabase.from('offices').insert(persistenceData).select();

    if (error) throw error;

    if (!data || data.length === 0) {
      throw new Error('No office returned from Supabase');
    }

    // Map the persisted data back to domain model
    return toDomainModel(data[0]);
  },

  findByDoctorId: async (doctorId: string): Promise<Office | null> => {
    const { data, error } = await supabase
      .from('offices')
      .select()
      .eq('doctorId', doctorId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // No office found
      }
      throw error;
    }

    return toDomainModel(data);
  },

  update: async (id: string, office: Office): Promise<Office> => {
    const persistenceData = toPersistenceModel(office);

    const { data, error } = await supabase
      .from('offices')
      .update(persistenceData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    if (!data) {
      throw new Error('No office returned from Supabase');
    }

    return toDomainModel(data);
  },
});
