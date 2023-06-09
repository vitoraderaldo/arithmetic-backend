import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { CalculatorController } from './routes/calculator.controller';
import { CalculateUseCase } from '../../usecase/calculator/calculate.usecase';
import { FindOperationsUseCase } from '../../usecase/calculator/find-operations.usecase';
import { FindOperationsOutputDto } from '../../usecase/calculator/dto/operation.dto';
import { AuthGuard } from '../guards/auth.guard';

describe('CalculatorController', () => {
  let calculatorController: CalculatorController;
  let calculateUseCase: CalculateUseCase;
  let findOperationsUseCase: FindOperationsUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [
        {
          provide: CalculateUseCase,
          useValue: createMock<CalculateUseCase>(),
        },
        {
          provide: FindOperationsUseCase,
          useValue: createMock<FindOperationsUseCase>(),
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(createMock<AuthGuard>())
      .compile();

    calculatorController = app.get<CalculatorController>(CalculatorController);
    calculateUseCase = app.get<CalculateUseCase>(CalculateUseCase);
    findOperationsUseCase = app.get<FindOperationsUseCase>(
      FindOperationsUseCase,
    );
  });

  it('must create the controller successfully', () => {
    expect(calculatorController).toBeDefined();
  });

  describe('Calculate', () => {
    const finalBalance = 90;
    const identityProviderId = '123';
    it('must sum 2 numbers', async () => {
      const result = 10;
      jest
        .spyOn(calculateUseCase, 'execute')
        .mockResolvedValueOnce({ result, finalBalance });

      const response = await calculatorController.addNumbers(
        identityProviderId,
        {
          arguments: [7, 3],
        },
      );

      expect(response).toEqual({ result, finalBalance });
    });

    it('must subtract 2 numbers', async () => {
      const result = 10;
      jest
        .spyOn(calculateUseCase, 'execute')
        .mockResolvedValueOnce({ result, finalBalance });

      const response = await calculatorController.subtractNumbers(
        identityProviderId,
        {
          arguments: [20, 10],
        },
      );
      expect(response).toEqual({ result, finalBalance });
    });

    it('must multiply 2 numbers', async () => {
      const result = 10;
      jest
        .spyOn(calculateUseCase, 'execute')
        .mockResolvedValueOnce({ result, finalBalance });

      const response = await calculatorController.multiplyNumbers(
        identityProviderId,
        {
          arguments: [2, 5],
        },
      );
      expect(response).toEqual({ result, finalBalance });
    });

    it('must divide 2 numbers', async () => {
      const result = 10;
      jest
        .spyOn(calculateUseCase, 'execute')
        .mockResolvedValueOnce({ result, finalBalance });

      const response = await calculatorController.divideNumbers(
        identityProviderId,
        {
          arguments: [100, 10],
        },
      );
      expect(response).toEqual({ result, finalBalance });
    });

    it('must calculate the square root of a number', async () => {
      const result = 10;
      jest
        .spyOn(calculateUseCase, 'execute')
        .mockResolvedValueOnce({ result, finalBalance });

      const response = await calculatorController.calculateSquareRoot(
        identityProviderId,
        {
          arguments: [100],
        },
      );
      expect(response).toEqual({ result, finalBalance });
    });

    it('must generate random string', async () => {
      const result = 'random-string';
      jest
        .spyOn(calculateUseCase, 'execute')
        .mockResolvedValueOnce({ result, finalBalance });

      const response = await calculatorController.generateRandomString(
        identityProviderId,
      );
      expect(response).toEqual({ result, finalBalance });
    });
  });

  describe('Find Operations', () => {
    it('must return the operations', async () => {
      const operations: FindOperationsOutputDto = {
        operations: [
          {
            id: 1,
            name: 'Addition',
            cost: 10,
            inputs: 2,
          },
        ],
      };

      jest
        .spyOn(findOperationsUseCase, 'execute')
        .mockResolvedValueOnce(operations);

      const response = await calculatorController.findOperations();
      expect(response).toEqual(operations);
    });
  });
});
