import { Body, Controller, Post } from "@nestjs/common";
import { UserLoginOutputDto } from "../../../usecase/user/user-login.dto";
import { UserLogsInUseCase } from "../../../usecase/user/user-login.case";
import { UserLoginRequest } from "./requests/user-login.request";

@Controller('/user')
export class UserController {
  constructor(
    private readonly userLogsInUseCase: UserLogsInUseCase,
  ) {}

  @Post('/login')
  public login(@Body() credetials: UserLoginRequest): Promise<UserLoginOutputDto> {
    return this.userLogsInUseCase.execute(credetials);
  }
}
