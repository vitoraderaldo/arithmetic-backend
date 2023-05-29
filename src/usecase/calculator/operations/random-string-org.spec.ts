import { createMock } from "@golevelup/ts-jest";
import { HtppClient } from "../../../@shared/interface/http-client.interface";
import { RandomStringOrg } from "./random-string-org";

describe('Random String Org', () => {

  let randomStringOrg: RandomStringOrg;
  let httpClient: HtppClient;

  beforeEach(() => {
    httpClient = createMock<HtppClient>();
    randomStringOrg = new RandomStringOrg(httpClient);
  })

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  it('must be defined', () => {
    expect(randomStringOrg).toBeDefined();
  })

  it('must return a random string', async () => {
    const randomString = 'random-string';
    const getSpy = jest
      .spyOn(httpClient, 'get')
      .mockResolvedValueOnce(randomString)

    const result = await randomStringOrg.randomString();
    expect(result).toEqual(randomString);
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('https://random.org/strings/?num=8&len=1&digits=on&upperalpha=on&loweralpha=on&format=plain');
  })

})
