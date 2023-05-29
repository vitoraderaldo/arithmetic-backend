import { RandomStringInterface } from '../strategy/random-string.interface';

export class RandomStringService {
  constructor(private readonly randomStringInterface: RandomStringInterface) {}

  public async randomString(): Promise<string> {
    return this.randomStringInterface.randomString();
  }
}
