import axios from 'axios';
import { AxiosService } from './axios.service';

jest.mock('axios');

describe('AxiosService', () => {
  let service: AxiosService;

  beforeEach(() => {
    service = new AxiosService();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should make a GET request and return the response data', async () => {
    const url = 'https://example.com/api';
    const headers = { 'Content-Type': 'application/json' };
    const responseData = { response: '123' };
    const axiosResponse = { data: responseData };

    (axios.get as jest.Mock).mockResolvedValue(axiosResponse);

    const result = await service.get(url, headers);

    expect(axios.get).toHaveBeenCalledWith(url, { headers, timeout: 5000 });
    expect(result).toEqual(responseData);
  });

  it('should throw an error if the GET request times out', async () => {
    const url = 'https://example.com/api';
    const headers = { 'Content-Type': 'application/json' };
    const timeoutError = {
      isAxiosError: true,
      code: 'ECONNABORTED',
      message: 'timeout of 5000ms exceeded',
    };

    (axios.get as jest.Mock).mockRejectedValue(timeoutError);

    await expect(service.get(url, headers)).rejects.toMatchObject(timeoutError);
    expect(axios.get).toHaveBeenCalledWith(url, { headers, timeout: 5000 });
  });
});
