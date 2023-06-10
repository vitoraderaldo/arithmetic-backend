import { createMock } from '@golevelup/ts-jest';
import { EnvironmentConfigInterface } from '../../../@shared/environment/environment-config.interface';
import { CognitoIdentityProviderService } from './cognito-identity-provider';
import { IdentityLoginInputDto } from '../../../domain/user/repository/identity-login.dto';

jest.mock('aws-sdk');

describe('Cognito Identity Provider', () => {
  let sut: CognitoIdentityProviderService;
  let envService: EnvironmentConfigInterface;

  beforeEach(() => {
    envService = createMock<EnvironmentConfigInterface>();
    jest.spyOn(envService, 'getCognito').mockReturnValue({
      region: 'region',
      userPoolId: 'userPoolId',
      clientId: 'clientId',
    });
    sut = new CognitoIdentityProviderService(envService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should login', async () => {
    const credentials: IdentityLoginInputDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const accessToken = 'accessToken';
    const refreshToken = 'refreshToken';
    const expiresIn = 300;

    const mockInitiateAuth = jest.fn().mockReturnValueOnce({
      promise: jest.fn().mockResolvedValueOnce({
        AuthenticationResult: {
          AccessToken: accessToken,
          RefreshToken: refreshToken,
          ExpiresIn: expiresIn,
        },
      }),
    });
    (sut as any).cognito.initiateAuth = mockInitiateAuth;

    const response = await sut.login(credentials);
    expect(response).toEqual({
      accessToken,
      refreshToken,
      expirensInSeconds: expiresIn,
    });

    expect(mockInitiateAuth).toHaveBeenCalledWith({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: 'clientId',
      AuthParameters: {
        USERNAME: credentials.email,
        PASSWORD: credentials.password,
      },
    });
  });

});
