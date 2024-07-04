/// <reference types="react" />
import { CustomMapOptions, SFComponent } from '../../models';
type MenuTypeProps = {
    value: CustomMapOptions;
    onChange(e: any): void;
    currentValue: SFComponent | undefined;
};
export declare const ListType: (props: MenuTypeProps) => JSX.Element;
export {};
