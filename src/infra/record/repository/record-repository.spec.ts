import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordRepository } from './record-repository';
import { RecordModel } from './record.model';
import { Record } from '../../../domain/record/entity/record';
import { User } from '../../../domain/user/entity/user';
import { Operation } from '../../../domain/calculator/entity/operation';
import { OperationType } from '../../../domain/calculator/operation.types';
import { RecordNotFound } from '../../../domain/record/error/record-not-found';

describe('RecordRepository', () => {
  let sut: RecordRepository;
  let repository: Repository<RecordModel>;

  const recordModel1: RecordModel = {
    id: '1',
    operationId: 1,
    userId: 1,
    amount: 10,
    userBalance: 100,
    operationResponse: '5',
    deleted: false,
    dateCreated: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecordRepository,
        {
          provide: getRepositoryToken(RecordModel),
          useValue: createMock<Repository<RecordModel>>(),
        },
      ],
    }).compile();

    sut = module.get<RecordRepository>(RecordRepository);
    repository = module.get<Repository<RecordModel>>(
      getRepositoryToken(RecordModel),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('Create', () => {
    it('should create a record', async () => {
      const saveSpy = jest.spyOn(repository, 'save');

      const recordEntity = Record.createNewRecord(
        new User(1, 'user@email.com', 1, 100),
        new Operation(1, OperationType.ADDITION, 'Addition', 5, 2),
        '2',
      );

      await sut.create(recordEntity);
      expect(saveSpy).toHaveBeenCalled();
    });
  });

  describe('Find by ID', () => {
    it('should find a record by ID', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(recordModel1);

      const record = await sut.findById('1');
      expect(record.getId()).toEqual(recordModel1.id);
      expect(record.getOperationId()).toEqual(recordModel1.operationId);
      expect(record.getUserId()).toEqual(recordModel1.userId);
      expect(record.getAmount()).toEqual(recordModel1.amount);
      expect(record.getUserBalance()).toEqual(recordModel1.userBalance);
      expect(record.getOperationResponse()).toEqual(
        recordModel1.operationResponse,
      );
      expect(record.isDeleted()).toEqual(recordModel1.deleted);
    });

    it('should throw an error if record is not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      const response = sut.findById('1');
      await expect(response).rejects.toThrowError(RecordNotFound);
      await expect(response).rejects.toThrowError('Record not found with id 1');
    });
  });

  it('must delete a record', async () => {
    const updateSpy = jest.spyOn(repository, 'update');

    await sut.deleteById('1');
    expect(updateSpy).toHaveBeenCalledWith(
      {
        id: '1',
      },
      {
        deleted: true,
      },
    );
  });

  it('must search records', async () => {
    jest
      .spyOn(repository, 'findAndCount')
      .mockResolvedValueOnce([[recordModel1], 1]);

    const response = await sut.searchActive({
      filter: {
        userId: 1,
        operationId: 1,
        startDate: new Date(),
        endDate: new Date(),
      },
      pagination: {
        page: 1,
        pageSize: 10,
      },
      sort: {
        field: 'dateCreated',
        order: 'desc',
      },
    });

    const { data, total } = response;
    expect(data[0].getId()).toEqual(recordModel1.id);
    expect(data[0].getOperationId()).toEqual(recordModel1.operationId);
    expect(data[0].getUserId()).toEqual(recordModel1.userId);
    expect(data[0].getAmount()).toEqual(recordModel1.amount);
    expect(data[0].getUserBalance()).toEqual(recordModel1.userBalance);
    expect(data[0].getOperationResponse()).toEqual(
      recordModel1.operationResponse,
    );
    expect(data[0].isDeleted()).toEqual(recordModel1.deleted);
    expect(total).toEqual(1);
  });
});
