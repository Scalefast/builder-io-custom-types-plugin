import { CustomApplicationContext } from '../models';
export default class ApiService {
    private readonly baseUrl;
    getModel(modelId: string, context: CustomApplicationContext, params?: string): Promise<any>;
    getContent(modelId: string, contentId: string, context: CustomApplicationContext, params?: string): Promise<any>;
}
