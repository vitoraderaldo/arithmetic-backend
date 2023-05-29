import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [],
    }).compile();

    controller = app.get<HealthCheckController>(HealthCheckController);
  });

  it('must create the controller successfully', () => {
    expect(controller).toBeDefined();
  });


  it('must return hello world', async () => {
    const response = controller.healthCheck();
    expect(response).toEqual('Hello World!');
  });
});
