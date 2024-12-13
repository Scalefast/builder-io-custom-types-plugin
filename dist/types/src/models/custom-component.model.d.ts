import { CustomMapOptions } from './esw-custom-types';
export type CustomValue = string | boolean | number | {
    [key: string]: CustomValue;
} | Record<string, any>;
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
    toJSON(): any;
}
export interface SFComponentState {
    customPageComps: SFComponentOptions[];
    selectedComponent: SFComponentOptions | undefined;
    selectedId: string;
}
export declare const defaultComponents: SFComponentOptions[];
