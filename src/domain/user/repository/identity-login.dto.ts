export interface IdentityLoginInputDto {
  email: string;
  password: string;
}

export interface IdentityLoginOutputDto {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  expirensInSeconds: number;
}
