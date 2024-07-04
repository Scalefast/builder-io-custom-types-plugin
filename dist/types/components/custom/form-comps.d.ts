/// <reference types="react" />
import { CustomMapOptions, CustomValue } from '../../models';
type FormTypeProps = {
    value: CustomMapOptions;
    onChange(e: any): void;
    currentValue: CustomValue | undefined;
};
export declare const FromType: (props: FormTypeProps) => JSX.Element;
export {};
