import { createMock } from "@golevelup/ts-jest";
import { UserLogsInUseCase } from "./user-login.case";
import { IdentityProviderInterface } from "../../domain/user/repository/identity-provider.interface";
import { UserLoginInputDto } from "./user-login.dto";
import { IdentityLoginOutputDto } from "../../domain/user/repository/identity-login.dto";

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
  
})
