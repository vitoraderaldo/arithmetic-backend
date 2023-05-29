import { createMock } from "@golevelup/ts-jest";
import { UserLogsInUseCase } from "./user-login.case";
import { IdentityProviderInterface } from "../../domain/user/repository/identity-provider.interface";
import { UserLoginInputDto } from "./user-login.dto";
import { IdentityLoginOutputDto } from "../../domain/user/repository/identity-login.dto";
import { InvalidCredentials } from "../../domain/user/error/invalid-credentials.error";

describe('User Login', () => {

  let useCase: UserLogsInUseCase;
  let identityProvider: IdentityProviderInterface;

  beforeEach(async () => {
    identityProvider = createMock<IdentityProviderInterface>();
    useCase = new UserLogsInUseCase(identityProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should call identity provider to login', async () => {
    const credentials: UserLoginInputDto = {
      email: 'john@email.com',
      password: '1234',
    };
    const loginResponse: IdentityLoginOutputDto = {
      accessToken: "access-token",
      refreshToken: "refresh-token",
      expirensInSeconds: 3600
    }

    jest
      .spyOn(identityProvider, 'login')
      .mockResolvedValue(loginResponse)

    const response = await useCase.execute(credentials);
    expect(response).toEqual(loginResponse);
  })

  it('must throw InvalidCrendetials when an error happens', async () => {
    const anyError = new Error('Cognito is down');
    const credentials: UserLoginInputDto = {
      email: 'user@email.com',
      password: '1234',
    };

    jest
      .spyOn(identityProvider, 'login')
      .mockRejectedValue(anyError);

    const response = useCase.execute(credentials);
    await expect(response).rejects.toThrowError('Invalid credentials');
    await expect(response).rejects.toThrowError(InvalidCredentials);
  })
  
})
