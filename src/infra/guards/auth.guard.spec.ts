import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { AuthGuard } from './auth.guard';
import { AuthRequest } from './custom.request';
import { validIdTokenMock } from '../../mocks/valid-token.mock';

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

    mockRequest.headers['authorization'] = `Bearer ${validIdTokenMock}`;

    const result = await guard.canActivate(mockContext);

    expect(result).toBe(true);
    expect(mockRequest.user).toEqual({
      sub: '790b0b1e-302f-4b81-8fff-c4a498386772',
    });
  });

  it('should deny access if token is invalid', async () => {
    const mockRequest = createMock<AuthRequest>();
    const mockContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    });

    mockRequest.headers['authorization'] = 'invalidToken';

    const result = await guard.canActivate(mockContext);

    expect(result).toBe(false);
  });
});
