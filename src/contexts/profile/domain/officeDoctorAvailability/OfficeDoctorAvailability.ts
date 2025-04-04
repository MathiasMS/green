export type DayOfWeek =
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado'
  | 'Domingo';

export type OfficeDoctorAvailability = {
  id: string;
  officeId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export type OfficeDoctorAvailabilityParams = {
  id: string;
  officeId: string;
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export const createOfficeDoctorAvailability = (
  params: OfficeDoctorAvailabilityParams
): OfficeDoctorAvailability => {
  const officeDoctorAvailability: OfficeDoctorAvailability = {
    id: params.id,
    officeId: params.officeId,
    dayOfWeek: params.dayOfWeek,
    startTime: params.startTime,
    endTime: params.endTime,
    isAvailable: params.isAvailable,
  };
  validateOfficeDoctorAvailability(officeDoctorAvailability);

  return officeDoctorAvailability;
};

const validateOfficeDoctorAvailability = ({
  id,
  officeId,
  dayOfWeek,
  startTime,
  endTime,
}: OfficeDoctorAvailabilityParams) => {
  // Validate required fields
  if (!id) throw new Error('Id is required');
  if (!officeId) throw new Error('Office ID is required');
  if (!dayOfWeek) throw new Error('Day of week is required');
  if (!startTime) throw new Error('Start time is required');
  if (!endTime) throw new Error('End time is required');

  // Validate time format (HH:mm)
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(startTime)) throw new Error('Start time must be in HH:mm format');
  if (!timeRegex.test(endTime)) throw new Error('End time must be in HH:mm format');

  // Validate start time is before end time
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  if (startMinutes >= endMinutes) {
    throw new Error('Start time must be before end time');
  }
};

export type OfficeDoctorAvailabilityRepository = {
  create(availability: OfficeDoctorAvailabilityParams): Promise<OfficeDoctorAvailability>;
  createMany(availabilities: OfficeDoctorAvailabilityParams[]): Promise<OfficeDoctorAvailability[]>;
  findByOfficeId(officeId: string): Promise<OfficeDoctorAvailability[]>;
  deleteByOfficeId(officeId: string): Promise<void>;
  update(
    id: string,
    availability: OfficeDoctorAvailabilityParams
  ): Promise<OfficeDoctorAvailability>;
};
