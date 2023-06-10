import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { decode } from 'jsonwebtoken';
import { AuthGuard } from './auth.guard';
import { AuthRequest } from './custom.request';

jest.mock('jsonwebtoken', () => ({
  decode: jest.fn(),
}));

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    guard = new AuthGuard();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should allow access if token exists and has the sub property', async () => {
    const mockRequest = createMock<AuthRequest>();
    const mockContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    });

    const accessToken = 'validAccessToken';
    mockRequest.headers['authorization'] = accessToken;

    const mockDecodedToken = { sub: 'user123' };
    (decode as jest.Mock).mockReturnValue(mockDecodedToken);

    const result = await guard.canActivate(mockContext);

    expect(result).toBe(true);
    expect(mockRequest.user).toEqual({ sub: 'user123' });
  });

  it('should deny access if token is invalid', async () => {
    const mockRequest = createMock<AuthRequest>();
    const mockContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    });

    const invalidAccessToken = 'invalidAccessToken';
    mockRequest.headers['authorization'] = invalidAccessToken;

    const result = await guard.canActivate(mockContext);

    expect(result).toBe(false);
  });
});
