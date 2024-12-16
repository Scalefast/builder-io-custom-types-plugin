import { CustomApplicationContext } from '../models';

export default class ApiService {
  private readonly baseUrl: string = 'https://cdn.builder.io/api/';

  async getModel(modelId: string, context: CustomApplicationContext, params?: string) {
    let url = `${this.baseUrl}v3/content/${modelId}?apiKey=${context.user.apiKey}`;
    if (params) {
      url += `&${params}`;
    }

    const result = await context.httpCache.getAsync(url, {
      headers: context.user.authHeaders,
    });

    return result.value;
  }

  async getContent(modelId: string, contentId: string, context: CustomApplicationContext, params?: string) {
    let url = `${this.baseUrl}v3/content/${modelId}/${contentId}?apiKey=${context.user.apiKey}`;
    if (params) {
      url += `&${params}`;
    }

    const result = await context.httpCache.getAsync(url, {
      headers: context.user.authHeaders,
    });

    return result.value;
  }
}
