export default class ApiService {
  private readonly baseUrl: string = 'https://cdn.builder.io/api/v3/content/';

  async getModels(url: string, customHeaders: {}) {
    return await fetch(`${this.baseUrl}${url}`, {
      headers: customHeaders,
    }).then((res) => res.json());
  }
}
