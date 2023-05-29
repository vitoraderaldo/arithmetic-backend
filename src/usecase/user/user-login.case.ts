import { InvalidCredentials } from "../../domain/user/error/invalid-credentials.error";
import { IdentityProviderInterface } from "../../domain/user/repository/identity-provider.interface";
import { UserLoginInputDto, UserLoginOutputDto } from "./user-login.dto";

export class UserLogsInUseCase {

  constructor(
    private readonly identityProviderInterface: IdentityProviderInterface
  ) {}

  public async execute(credentials: UserLoginInputDto): Promise<UserLoginOutputDto> {
    try {
      return await this.identityProviderInterface.login(credentials);
    } catch (err) {
      throw new InvalidCredentials("Invalid credentials")
    }
  }

}
