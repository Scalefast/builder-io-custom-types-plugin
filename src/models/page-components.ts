import { CustomMapOptions } from './custom-map';

export type CustomValue = string | boolean | number | { [key: string]: CustomValue };

export interface SFComponentOptions {
  id: string;
  title: string;
  options: CustomMapOptions[];
}

export interface SFComponent {
  id: string;
  title: string;
  options: { [key: string]: CustomValue };
}

export interface SFComponentState {
  currentValue: SFComponent | undefined;
  customPageComps: SFComponentOptions[];
  selectedComponent: SFComponentOptions | undefined;
  selectedId: string;
}

export const defaultComponents: SFComponentOptions[] = [
  {
    id: 'submenu',
    title: 'Sub-menu Image List',
    options: [
      {
        key: 'item', type: 'list', subOptions: [
          { key: 'name', type: 'text' },
          { key: 'url', type: 'text' },
          { key: 'image', type: 'image' },
        ]
      }
    ]
  }
]
