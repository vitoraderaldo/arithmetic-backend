import { createMock } from '@golevelup/ts-jest';
import { UserLogsInUseCase } from './user-login.case';
import { IdentityProviderInterface } from '../../domain/user/repository/identity-provider.interface';
import { UserLoginInputDto } from './user-login.dto';
import { IdentityLoginOutputDto } from '../../domain/user/repository/identity-login.dto';
import { InvalidCredentials } from '../../domain/user/error/invalid-credentials.error';
import { UserRepository } from '../../infra/user/repository/user.repository';
import { User } from '../../domain/user/entity/user';

describe('User Login', () => {
  let useCase: UserLogsInUseCase;
  let identityProvider: IdentityProviderInterface;
  let userRepository: UserRepository;
  let activeUser: User;

  beforeEach(async () => {
    identityProvider = createMock<IdentityProviderInterface>();
    userRepository = createMock<UserRepository>();
    useCase = new UserLogsInUseCase(identityProvider, userRepository);
    activeUser = new User(1, 'email@email.com', 1, 100);
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
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      expirensInSeconds: 3600,
    };

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(activeUser);

    jest.spyOn(identityProvider, 'login').mockResolvedValue(loginResponse);

    const response = await useCase.execute(credentials);
    expect(response).toEqual(loginResponse);
  });

  it('must throw InvalidCrendetials when an error happens', async () => {
    const anyError = new Error('Cognito is down');
    const credentials: UserLoginInputDto = {
      email: 'user@email.com',
      password: '1234',
    };

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(activeUser);

    jest.spyOn(identityProvider, 'login').mockRejectedValue(anyError);

    const response = useCase.execute(credentials);
    await expect(response).rejects.toThrowError('Invalid credentials');
    await expect(response).rejects.toThrowError(InvalidCredentials);
  });

  it('must throw error when user is inactive', async () => {
    const credentials: UserLoginInputDto = {
      email: 'user@email.com',
      password: '1234',
    };

    const inactiveUser = new User(1, credentials.email, 0, 100);

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(inactiveUser);

    const loginSpy = jest.spyOn(identityProvider, 'login');

    const response = useCase.execute(credentials);
    await expect(response).rejects.toThrowError('This account is not active');
    await expect(response).rejects.toThrowError(InvalidCredentials);
    expect(loginSpy).not.toHaveBeenCalled();
  });
});
