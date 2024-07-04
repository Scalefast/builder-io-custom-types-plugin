export interface CustomMapOptions {
    key: string;
    type: string;
    values?: string[];
    subOptions?: CustomMapOptions[];
}
export declare const CustomTypes: CustomMapOptions[];
