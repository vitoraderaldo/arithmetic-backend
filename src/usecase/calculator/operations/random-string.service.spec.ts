import { createMock } from '@golevelup/ts-jest';
import { RandomStringInterface } from '../strategy/random-string.interface';
import { RandomStringService } from './random-string.service';

describe('Random String Service', () => {
  let randomStringService: RandomStringService;
  let randomStringInterface: RandomStringInterface;

  beforeEach(() => {
    randomStringInterface = createMock<RandomStringInterface>();
    randomStringService = new RandomStringService(randomStringInterface);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('must be defined', () => {
    expect(randomStringService).toBeDefined();
  });

  it('must return a random string', async () => {
    const randomString = 'random-string';
    jest
      .spyOn(randomStringInterface, 'randomString')
      .mockResolvedValueOnce(randomString);

    const result = await randomStringService.randomString();
    expect(result).toEqual(randomString);
  });
});
