export interface UserLoginInputDto {
  email: string;
  password: string;
}

export interface UserLoginOutputDto {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expirensInSeconds: number;
}
