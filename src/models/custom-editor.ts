import { CustomApplicationContext } from './custom-application-context';

export interface CustomEditorProps<ValueType> {
  context: CustomApplicationContext;
  customEditor: any;
  field: any;
  object: any;
  onChange(newValue: ValueType): void;
  path: string | undefined;
  value: ValueType | undefined;
}
