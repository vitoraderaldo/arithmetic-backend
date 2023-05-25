import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { InitiateAuthRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { IdentityLoginInputDto, IdentityLoginOutputDto } from "../../../domain/user/repository/identity-login.dto";
import { IdentityProviderInterface } from "../../../domain/user/repository/identity-provider.interface";
import { EnvironmentConfigInterface } from '../../../@shared/environment/environment-config.interface';
import { CognitoJwtVerifierSingleUserPool } from 'aws-jwt-verify/cognito-verifier';

export class CognitoIdentityProviderService implements IdentityProviderInterface {

  private readonly cognito: CognitoIdentityServiceProvider;
  private readonly verifier: CognitoJwtVerifierSingleUserPool<any>

  constructor(
    private readonly environmentConfigInterface: EnvironmentConfigInterface,
  ) {
    this.cognito = new CognitoIdentityServiceProvider({
      region: environmentConfigInterface.getCognito().region,
    });
    this.verifier = CognitoJwtVerifier.create({
      userPoolId: environmentConfigInterface.getCognito().userPoolId,
      tokenUse: "access",
      clientId: environmentConfigInterface.getCognito().clientId,
    });
  }
  
  async login(credentials: IdentityLoginInputDto): Promise<IdentityLoginOutputDto> {
    const params: InitiateAuthRequest = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.environmentConfigInterface.getCognito().clientId,
      AuthParameters: {
        USERNAME: credentials.email,
        PASSWORD: credentials.password,
      },
    };
  
    const response = await this.cognito.initiateAuth(params).promise()
    const authResult = response.AuthenticationResult;

    return {
      accessToken: authResult.AccessToken,
      refreshToken: authResult.RefreshToken,
      expirensInSeconds: authResult.ExpiresIn,
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      await this.verifier.verify(token);
      return true
    } catch (error) {
      return false;
    }
  }
  
}
