import { IdentityProviderInterface } from "../../domain/user/repository/identity-provider.interface";
import { UserLoginInputDto, UserLoginOutputDto } from "./user-login.dto";

export class UserLogsInUseCase {

  constructor(
    private readonly identityProviderInterface: IdentityProviderInterface
  ) {}

  public execute(credentials: UserLoginInputDto): Promise<UserLoginOutputDto> {
    return this.identityProviderInterface.login(credentials);
  }

}
