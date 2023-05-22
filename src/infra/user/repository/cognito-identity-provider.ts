import { IdentityLoginInputDto, IdentityLoginOutputDto } from "../../../domain/user/repository/identity-login.dto";
import { IdentityProviderInterface } from "../../../domain/user/repository/identity-provider.interface";

export class CognitoIdentityProviderService implements IdentityProviderInterface {
  
  login(credentials: IdentityLoginInputDto): Promise<IdentityLoginOutputDto> {
    return 'zaps' as any;
  }
  
}
