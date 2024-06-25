import { ApplicationContext } from '@builder.io/app-context';

export interface CustomEditorProps<ValueType> {
  context: ApplicationContext;
  customEditor: any;
  field: any;
  object: any;
  onChange(newValue: ValueType): void;
  path: string | undefined;
  value: ValueType | undefined;
}
