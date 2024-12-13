import { Model, SFComponentOptions } from '../models';
import { BuilderContent } from '@builder.io/sdk';
export type ContentAction = {
    label: string;
    showIf(content: any, model: any): Boolean;
    onClick(content: any): Promise<void>;
    isDisabled?: () => boolean;
    disabledTooltip?: string;
};
export declare const getModels: () => Model[];
export declare const findModel: (name: string) => Model | undefined;
export declare const findModelById: (id: string) => Model | undefined;
export declare const pluginConfig: () => {
    componentPage: any;
    componentName: any;
};
export declare const registerContentAction: (contentAction: ContentAction) => void;
export declare const transformComponents: (fetchedComps: BuilderContent[]) => SFComponentOptions[];
