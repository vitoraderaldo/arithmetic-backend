export interface UserLoginInputDto {
  email: string;
  password: string;
}

export interface UserLoginOutputDto {
  token: string;
}
