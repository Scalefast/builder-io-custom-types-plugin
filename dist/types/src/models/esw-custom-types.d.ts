import { CustomApplicationContext } from "./builder/custom-application-context";
import { SFComponent } from "./custom-component.model";
export interface CustomMapOptions {
    key: string;
    type: string;
    required?: boolean;
    helperText?: string;
    extraOptions?: Record<string, any>;
    values?: string[];
    subOptions?: CustomMapOptions[];
}
export declare const CustomTypes: CustomMapOptions[];
export interface CustomMapFormProps {
    opt: CustomMapOptions;
    onChange(action: string, index: number, newValue?: CustomMapOptions): void;
    index: number;
    context: CustomApplicationContext;
}
export type MenuTypeProps = {
    value: CustomMapOptions;
    onChange(e: any): void;
    currentValue: SFComponent | undefined;
    context: CustomApplicationContext;
    renderEditor: any;
};
export type TypeMapProps = {
    id: string;
    onChange(e: any): void;
    currentValue: CustomMapOptions;
};
