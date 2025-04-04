export type DayId = 'L' | 'M' | 'X' | 'J' | 'V' | 'S' | 'D';
export type DaysSelected = Record<DayId, boolean>;
export type DayName =
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado'
  | 'Domingo';
export type ScheduleRange = Record<DayName, { startTime: string; endTime: string }[]>;

export const Days: { id: DayId; name: DayName }[] = [
  { id: 'L', name: 'Lunes' },
  { id: 'M', name: 'Martes' },
  { id: 'X', name: 'Miércoles' },
  { id: 'J', name: 'Jueves' },
  { id: 'V', name: 'Viernes' },
  { id: 'S', name: 'Sábado' },
  { id: 'D', name: 'Domingo' },
];

// Generar horarios cada 5 minutos
export const generateScheduleTimes = () => {
  const scheduleTimes = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const horaFormateada = hour.toString().padStart(2, '0');
      const minutoFormateado = minute.toString().padStart(2, '0');
      scheduleTimes.push(`${horaFormateada}:${minutoFormateado}`);
    }
  }
  return scheduleTimes;
};
