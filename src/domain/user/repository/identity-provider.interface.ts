import { IdentityLoginInputDto, IdentityLoginOutputDto } from "./identity-login.dto";

export interface IdentityProviderInterface {
  login(credentials: IdentityLoginInputDto): Promise<IdentityLoginOutputDto>;
}
