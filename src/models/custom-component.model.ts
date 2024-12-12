import { CustomMapOptions } from './esw-custom-types';

export type CustomValue = string | boolean | number | { [key: string]: CustomValue } | Record<string, any>;

export interface SFComponentOptions {
  id: string;
  title: string;
  options: CustomMapOptions[];
}

export interface SFComponent {
  id: string;
  title: string;
  options: { [key: string]: CustomValue };
  toJSON(): any;
}

export interface SFComponentState {
  customPageComps: SFComponentOptions[];
  selectedComponent: SFComponentOptions | undefined;
  selectedId: string;
}

export const defaultComponents: SFComponentOptions[] = [
  {
    id: 'submenu',
    title: 'Subcategory Navigation',
    options: [
      {
        key: 'item', type: 'custom_list', subOptions: [
          { key: 'name', type: 'text' },
          { key: 'url', type: 'text' },
          { key: 'image', type: 'text' },
        ]
      }
    ]
  }
]
