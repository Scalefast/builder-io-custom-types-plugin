export interface SFComponentOptions {
    id: string;
    title: string;
    options: string[];
}
export interface SFComponent {
    id: string;
    title: string;
    options: {
        [key: string]: string;
    };
}
export interface SFComponentState {
    currentValue: SFComponent | undefined;
    customPageComps: SFComponentOptions[];
    selectedComponent: SFComponentOptions | undefined;
    selectedId: string;
}
