import { createMock } from '@golevelup/ts-jest';
import { OperationRepositoryInterface } from '../../domain/calculator/repository/operation-repository.interface';
import { FindOperationsUseCase } from './find-operations.usecase'
import { Operation } from '../../domain/calculator/entity/operation';
import { OperationType } from '../../domain/calculator/operation.types';

describe('FindOperationsUseCase', () => {

  let useCase: FindOperationsUseCase;
  let operationRepository: OperationRepositoryInterface

  beforeEach(() => {
    operationRepository = createMock<OperationRepositoryInterface>();
    useCase = new FindOperationsUseCase(operationRepository);
  })

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  it('must be defined', () => {
    expect(useCase).toBeDefined();
  })

  it('must return the operations', async () => {
    const operations: Operation[] = [
      new Operation(1, OperationType.ADDITION, 'Addition', 5, 2),
      new Operation(2, OperationType.SQUARE_ROOT, 'Square Root', 3, 1),
    ]

    jest
      .spyOn(operationRepository, 'findAll')
      .mockResolvedValueOnce(operations);
    
    const response = await useCase.execute();
    
    expect(response).toEqual({
      operations: [
        {
          id: 1,
          name: 'Addition',
          cost: 5,
          inputs: 2,
        },
        {
          id: 2,
          name: 'Square Root',
          cost: 3,
          inputs: 1,
        },
      ]
    })
  })

})
