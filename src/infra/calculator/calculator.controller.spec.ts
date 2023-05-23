import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest'
import { CalculatorController } from './routes/calculator.controller';
import { CalculateUseCase } from '../../usecase/calculator/calculate.usecase';

describe('CalculatorController', () => {
  let calculatorController: CalculatorController;
  let calculateUseCase: CalculateUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CalculatorController],
      providers: [
        {
          provide: CalculateUseCase,
          useValue: createMock<CalculateUseCase>(),
        }
      ],
    }).compile();

    calculatorController = app.get<CalculatorController>(CalculatorController);
    calculateUseCase = app.get<CalculateUseCase>(CalculateUseCase);
  });

  it('must create the controller successfully', () => {
    expect(calculatorController).toBeDefined();
  });

  describe('Calculate', () => {
    it('must sum 2 numbers', async () => {
      const result = 10
      const identityProviderId = '123'
      
      jest.spyOn(calculateUseCase, 'execute')
        .mockResolvedValueOnce({ result });
      
      const response = await calculatorController.addNumbers(identityProviderId, {
        arguments: [7, 3],
      });

      expect(response).toEqual({ result })
    })
   
  });
});
