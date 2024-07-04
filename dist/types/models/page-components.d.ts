import { CustomMapOptions } from './custom-map';
export type CustomValue = string | boolean | number | {
    [key: string]: CustomValue;
};
export interface SFComponentOptions {
    id: string;
    title: string;
    options: CustomMapOptions[];
}
export interface SFComponent {
    id: string;
    title: string;
    options: {
        [key: string]: CustomValue;
    };
    updated: number;
    toJSON(): any;
}
export interface SFComponentState {
    currentValue: SFComponent | undefined;
    customPageComps: SFComponentOptions[];
    selectedComponent: SFComponentOptions | undefined;
    selectedId: string;
}
export declare const defaultComponents: SFComponentOptions[];
