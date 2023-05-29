import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationRepository } from './operation.repository';
import { OperationModel } from './operation.model';
import { OperationType } from '../../../domain/calculator/operation.types';
import { UnknownOperation } from '../../../domain/calculator/error/operation-not-found';

describe('OperationRepository', () => {
  let sut: OperationRepository;
  let repository: Repository<OperationModel>;

  const operationModel: OperationModel = {
    id: 1,
    type: OperationType.ADDITION,
    name: 'Addition',
    cost: 1,
    inputsRequired: 2,
    dateCreated: new Date(),
    dateModified: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationRepository,
        {
          provide: getRepositoryToken(OperationModel),
          useValue: createMock<Repository<OperationModel>>(),
        },
      ],
    }).compile();

    sut = module.get<OperationRepository>(OperationRepository);
    repository = module.get<Repository<OperationModel>>(
      getRepositoryToken(OperationModel),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('Find by Type', () => {
    it('should find by type', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(operationModel);

      const operation = await sut.findByType(OperationType.ADDITION);
      expect(operation.getId()).toEqual(operationModel.id);
      expect(operation.getType()).toEqual(operationModel.type);
      expect(operation.getName()).toEqual(operationModel.name);
      expect(operation.getCost()).toEqual(operationModel.cost);
    });

    it('should throw error when not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      const response = sut.findByType(OperationType.ADDITION);
      await expect(response).rejects.toThrowError(UnknownOperation);
      await expect(response).rejects.toThrowError(
        'Operation not found with type: ADDITION',
      );
    });
  });

  it('should find all', async () => {
    jest.spyOn(repository, 'find').mockResolvedValueOnce([operationModel]);

    const operations = await sut.findAll();
    expect(operations[0].getId()).toEqual(operationModel.id);
    expect(operations[0].getType()).toEqual(operationModel.type);
    expect(operations[0].getName()).toEqual(operationModel.name);
    expect(operations[0].getCost()).toEqual(operationModel.cost);
  });
});
