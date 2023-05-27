interface Headers {
  [key: string]: string
}

export interface HtppClient {
  get<T>(url: string, headers?: Headers): Promise<T>
}
