import { InvalidCredentials } from '../../domain/user/error/invalid-credentials.error';
import { IdentityProviderInterface } from '../../domain/user/repository/identity-provider.interface';
import { UserRepository } from '../../infra/user/repository/user.repository';
import { UserLoginInputDto, UserLoginOutputDto } from './user-login.dto';
import { UserNotFound } from '../../domain/user/error/user-not-found';

export class UserLogsInUseCase {
  constructor(
    private readonly identityProviderInterface: IdentityProviderInterface,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(
    credentials: UserLoginInputDto,
  ): Promise<UserLoginOutputDto> {
    let user;
    try {
      user = await this.userRepository.findByEmail(credentials.email);
    } catch (error) {
      if (error instanceof UserNotFound) {
        throw new InvalidCredentials('Invalid credentials');
      }
      throw error; // Re-throw other errors
    }

    if (!user.isActive()) {
      throw new InvalidCredentials('This account is not active');
    }

    return await this.identityProviderInterface.login(credentials).catch(() => {
      throw new InvalidCredentials('Invalid credentials');
    });
  }
}
