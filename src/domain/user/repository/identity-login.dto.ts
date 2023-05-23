export interface IdentityLoginInputDto {
  email: string;
  password: string;
}

export interface IdentityLoginOutputDto {
  accessToken: string;
  refreshToken: string,
  expirensInSeconds: number
}
