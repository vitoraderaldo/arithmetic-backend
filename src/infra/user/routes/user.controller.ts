import { Controller, Post } from "@nestjs/common";
import { UserLoginOutputDto } from "../../../usecase/user/user-login.dto";
import { UserLogsInUseCase } from "../../../usecase/user/user-login.case";

@Controller('/user')
export class UserController {
  constructor(
    private readonly userLogsInUseCase: UserLogsInUseCase,
  ) {}

  @Post('/login')
  public login(): Promise<UserLoginOutputDto> {
    return this.userLogsInUseCase.execute(null);
  }
}
