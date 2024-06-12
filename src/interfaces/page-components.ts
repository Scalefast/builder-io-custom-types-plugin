export interface SFComponentOptions {
  id: string;
  options: string[];
}

export interface SFComponent {
  id: string;
  options: { [key: string]: string };
}

export interface SFComponentState {
  currentValue: SFComponent | undefined;
  customPageComps: SFComponentOptions[];
  selectedComponent: SFComponentOptions | undefined;
  selectedId: string;
}