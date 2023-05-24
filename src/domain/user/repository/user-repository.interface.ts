import { User } from "../entity/user";

export interface UserRepositoryInterface {
  findByIdentityProviderId(identityProviderId: string): Promise<User>;
  updateBalance(user: User): Promise<void>;
}
