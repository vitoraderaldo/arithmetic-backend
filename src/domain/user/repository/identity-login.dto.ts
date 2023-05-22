export interface IdentityLoginInputDto {
  email: string;
  password: string;
}

export interface IdentityLoginOutputDto {
  token: string;
}
