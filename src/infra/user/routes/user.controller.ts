import { Body, Controller, Post } from "@nestjs/common";
import { UserLoginInputDto, UserLoginOutputDto } from "../../../usecase/user/user-login.dto";
import { UserLogsInUseCase } from "../../../usecase/user/user-login.case";

@Controller('/user')
export class UserController {
  constructor(
    private readonly userLogsInUseCase: UserLogsInUseCase,
  ) {}

  @Post('/login')
  public login(@Body() credetials: UserLoginInputDto): Promise<UserLoginOutputDto> {
    return this.userLogsInUseCase.execute(credetials);
  }
}
