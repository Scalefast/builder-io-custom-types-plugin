import { CustomApplicationContext } from "./custom-application-context";

export interface CustomEditorProps<ValueType> {
  context: CustomApplicationContext;
  customEditor: any;
  field: any;
  object: any;
  onChange(newValue: ValueType): void;
  path: string | undefined;
  value: ValueType | undefined;
  renderEditor(options: {
    fields: any[];
    object: any;
    onChange?: (options: any) => any;
  }): React.ReactElement;
}
