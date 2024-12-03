import { CustomApplicationContext } from './custom-application-context';
import { CustomMapOptions } from './custom-map';
import { CustomValue } from './page-components';

export type FormTypeProps = {
  value: CustomMapOptions;
  onChange(e: any): void;
  currentValue: CustomValue | undefined;
  context: CustomApplicationContext
};
