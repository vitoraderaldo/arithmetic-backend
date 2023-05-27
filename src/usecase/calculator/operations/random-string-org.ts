import { HtppClient } from "../../../@shared/interface/http-client.interface";
import { RandomStringInterface } from "../strategy/random-string.interface";

export class RandomStringOrg implements RandomStringInterface {

    constructor(
      private readonly httpClient: HtppClient
    ) {}

    private BASE_URL = 'https://random.org'
    private RANDOM_STRING_CONFIG = {
      num: 1,
      len: 1,
      digits: 'on',
      upperalpha: 'on',
      loweralpha: 'on',
      format: 'plain',
    }
  
    public randomString(): Promise<string> {
      const endpoint = '/strings'
      const url = `${this.BASE_URL}${endpoint}/?${new URLSearchParams(this.RANDOM_STRING_CONFIG as any)}`
      return this.httpClient.get<string>(url)
    }
}
