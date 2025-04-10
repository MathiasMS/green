import { SelectItem } from '../components/ui/AppSelect';

export const argentinaStates = [
  'Capital Federal',
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
] as const;

export type ArgentinaState = (typeof argentinaStates)[number];

export const argentinaStatesOptions: SelectItem[] = argentinaStates.map(state => ({
  label: state,
  value: state,
}));
