interface Headers {
  [key: string]: string;
}

export interface HttpClient {
  get<T>(url: string, headers?: Headers): Promise<T>;
}
