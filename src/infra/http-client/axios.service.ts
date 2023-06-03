import axios from 'axios';
import { HtppClient } from '../../@shared/http-client/http-client.interface';

export class AxiosService implements HtppClient {
  async get<T>(url: string, headers: any): Promise<T> {
    const response = await axios.get(url, {
      headers,
    });
    return response.data;
  }
}
