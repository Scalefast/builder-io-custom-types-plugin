import { ApplicationContext } from './application-context';
export interface CustomEditorProps<ValueType> {
    value: ValueType | undefined;
    onChange(newValue: ValueType): void;
    field: any;
    path: string | undefined;
    context: ApplicationContext;
    object: any;
}
