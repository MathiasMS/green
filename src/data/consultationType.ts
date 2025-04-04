// Virtual, Presencial, Hibrido
export const consultationType = ['Virtual', 'Presencial', 'Hibrido'];

export type ConsultationType = (typeof consultationType)[number];

export const consultationTypeOptions = consultationType.map(type => ({
  label: type,
  value: type,
}));
