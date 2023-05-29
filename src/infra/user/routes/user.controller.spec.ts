import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { UserController } from './user.controller';
import { UserLogsInUseCase } from '../../../usecase/user/user-login.case';
import { UserLoginOutputDto } from '../../../usecase/user/user-login.dto';

describe('UserController', () => {
  let userController: UserController;
  let userLogsInUseCase: UserLogsInUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserLogsInUseCase,
          useValue: createMock<UserLogsInUseCase>(),
        },
      ],
    }).compile();

    userController = app.get<UserController>(UserController);
    userLogsInUseCase = app.get<UserLogsInUseCase>(UserLogsInUseCase);
  });

  it('must create the controller successfully', () => {
    expect(userController).toBeDefined();
  });

  describe('Log In', () => {
    it('must log in successfully', async () => {
      const tokenResponse: UserLoginOutputDto = {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expirensInSeconds: 3600,
      };
      jest.spyOn(userLogsInUseCase, 'execute').mockResolvedValue(tokenResponse);

      const response = await userController.login({
        email: 'john@email.com',
        password: 'password123',
      });
      expect(response).toEqual(tokenResponse);
    });
  });
});
