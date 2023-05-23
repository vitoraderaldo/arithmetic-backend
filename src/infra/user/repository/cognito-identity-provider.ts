import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { IdentityLoginInputDto, IdentityLoginOutputDto } from "../../../domain/user/repository/identity-login.dto";
import { IdentityProviderInterface } from "../../../domain/user/repository/identity-provider.interface";
import { InitiateAuthRequest } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import { EnvironmentConfigInterface } from '../../../@shared/environment/environment-config.interface';

export class CognitoIdentityProviderService implements IdentityProviderInterface {

  private readonly cognito: CognitoIdentityServiceProvider;

  constructor(
    private readonly environmentConfigInterface: EnvironmentConfigInterface,
  ) {
    this.cognito = new CognitoIdentityServiceProvider({
      region: environmentConfigInterface.getCognito().region,
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
  
}
