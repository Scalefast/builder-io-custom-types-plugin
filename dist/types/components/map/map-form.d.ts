/// <reference types="react" />
import { CustomMapOptions } from '../../models';
interface CustomMapFormProps {
    opt: CustomMapOptions;
    onChange(action: string, index: number, newValue?: CustomMapOptions): void;
    index: number;
}
export declare const CustomMapForm: (props: CustomMapFormProps) => JSX.Element;
export {};
