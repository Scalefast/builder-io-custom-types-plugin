export interface CustomMapOptions {
  key: string,
  type: string,
  values?: string[],
}

export const CustomTypes: CustomMapOptions[] = [
  { key: 'text', type: 'Text' },
  { key: 'boolean', type: 'Boolean' },
  { key: 'number', type: 'Number' },
  { key: 'select', type: 'Select' },
];
