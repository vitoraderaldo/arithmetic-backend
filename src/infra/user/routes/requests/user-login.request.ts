import { IsEmail, IsString, Length } from "class-validator";

export class UserLoginRequest {
  @IsEmail()
  @Length(8, 50)
  email: string;

  @IsString()
  @Length(8, 30)
  password: string;
}
