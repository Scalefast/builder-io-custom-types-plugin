import { CustomMapOptions } from "./custom-map";

export interface SFComponentOptions {
  id: string;
  title: string;
  options: CustomMapOptions[];
}

export interface SFComponent {
  id: string;
  title: string;
  options: { [key: string]: string | boolean | number };
}

export interface SFComponentState {
  currentValue: SFComponent | undefined;
  customPageComps: SFComponentOptions[];
  selectedComponent: SFComponentOptions | undefined;
  selectedId: string;
}
