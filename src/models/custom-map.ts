export interface CustomMapOptions {
  key: string,
  type: string,
  required?: boolean;
  helperText?: string;
  extraOptions?: Record<string, any>[];
  values?: string[],
  subOptions?: CustomMapOptions[]
}

export const CustomTypes: CustomMapOptions[] = [
  { key: 'text', type: 'Text', required: false, helperText: '' },
  { key: 'boolean', type: 'Boolean', required: false, helperText: '' },
  { key: 'number', type: 'Number', required: false, helperText: '' },
  { key: 'select', type: 'Select', required: false, helperText: '' },
  { key: 'reference', type: 'Reference', required: false, helperText: '' },
  { key: 'data_source', type: 'Data Source', required: false, helperText: '' }
];
