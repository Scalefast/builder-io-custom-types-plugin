import { CustomApplicationContext } from './custom-application-context';
import { CustomMapOptions } from '../esw-custom-types';
import { CustomValue } from '../custom-component.model';
export type FormTypeProps = {
    value: CustomMapOptions;
    onChange(e: any): void;
    currentValue: CustomValue | undefined;
    context: CustomApplicationContext;
    renderEditor: any;
};
