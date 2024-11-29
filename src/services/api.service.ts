import { CustomApplicationContext } from '../models/custom-application-context';

export default class ApiService {
  private readonly baseUrl: string = 'https://cdn.builder.io/api/v3/content';

  async getModel(contentId: string, context: CustomApplicationContext, params?: string) {
    let url = `${this.baseUrl}/${contentId}?apiKey=${context.user.apiKey}`;
    if (params) {
      url += `&${params}`;
    }

    const result = await context.httpCache.getAsync(url, {
      headers: context.user.authHeaders,
    });

    return result.value;
  }
}
