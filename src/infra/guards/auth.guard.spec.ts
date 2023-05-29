import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { decode } from 'jsonwebtoken';
import { AuthGuard } from './auth.guard';
import { AuthRequest } from './custom.request';
import { IdentityProviderInterface } from '../../domain/user/repository/identity-provider.interface';

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
}));

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockIdentityProvider: IdentityProviderInterface;

  beforeEach(() => {
    mockIdentityProvider = createMock<IdentityProviderInterface>();
    guard = new AuthGuard(mockIdentityProvider);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should allow access if token is valid and set user on request', async () => {
    const mockRequest = createMock<AuthRequest>();
    const mockContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    });

    const accessToken = 'validAccessToken';
    mockRequest.headers['accesstoken'] = accessToken;

    const mockDecodedToken = { sub: 'user123' };
    (decode as jest.Mock).mockReturnValue(mockDecodedToken);

    const mockValidateToken = jest.fn().mockResolvedValue(true);
    mockIdentityProvider.validateToken = mockValidateToken;

    const result = await guard.canActivate(mockContext);

    expect(result).toBe(true);
    expect(mockValidateToken).toHaveBeenCalledWith(accessToken);
    expect(mockRequest.user).toEqual({ sub: 'user123' });
  });

  it('should deny access if token is missing or invalid', async () => {
    const mockRequest = createMock<AuthRequest>();
    const mockContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    });

    const invalidAccessToken = 'invalidAccessToken';
    mockRequest.headers['accesstoken'] = invalidAccessToken;

    const mockValidateToken = jest.fn().mockResolvedValue(false);
    mockIdentityProvider.validateToken = mockValidateToken;

    const result = await guard.canActivate(mockContext);

    expect(result).toBe(false);
  });

  it('should deny access and catch error if an error occurs during token validation', async () => {
    const mockRequest = createMock<AuthRequest>();
    const mockContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    });

    const accessToken = 'validAccessToken';
    mockRequest.headers['accesstoken'] = accessToken;

    const mockValidateToken = jest
      .fn()
      .mockRejectedValue(new Error('Token validation failed'));
    mockIdentityProvider.validateToken = mockValidateToken;

    const result = await guard.canActivate(mockContext);

    expect(result).toBe(false);
    expect(mockValidateToken).toHaveBeenCalledWith(accessToken);
  });
});
