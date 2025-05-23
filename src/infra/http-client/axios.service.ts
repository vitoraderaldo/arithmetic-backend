import axios from 'axios';
import { HttpClient } from '../../@shared/http-client/http-client.interface';

export class AxiosService implements HttpClient {
  async get<T>(url: string, headers: any): Promise<T> {
    const response = await axios.get(url, {
      headers,
      timeout: 5000,
    });
    return response.data;
  }
}
