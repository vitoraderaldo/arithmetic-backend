import axios from 'axios';
import { HtppClient } from '../../@shared/interface/http-client.interface';

export class AxiosService implements HtppClient {
  async get<T>(url: string, headers: any): Promise<T> {
    const response = await axios.get(url, {
      headers,
    });
    return response.data;
  }
}
