import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { UserModel } from './user.model';
import { UserNotFound } from '../../../domain/user/error/user-not-found';
import { User } from '../../../domain/user/entity/user';

describe('UserRepository', () => {

  let sut: UserRepository;
  let repository: Repository<UserModel>;

  const userModel: UserModel = {
    id: 1,
    email: 'user@email.com',
    statusId: 1,
    currentBalance: 100,
    identityProviderId: 'any-id',
    dateCreated: new Date(),
    dateModified: new Date()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserModel),
          useValue: createMock<Repository<UserModel>>()
        },
      ],
    }).compile();

    sut = module.get<UserRepository>(UserRepository);
    repository = module.get<Repository<UserModel>>(getRepositoryToken(UserModel));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('Find by identityProviderId', () => {
    it('should call repository', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(userModel);

      const user = await sut.findByIdentityProviderId('id');
      expect(user.getEmail()).toBe(userModel.email);
      expect(user.getId()).toBe(userModel.id);
      expect(user.getStatusId()).toBe(userModel.statusId);
      expect(user.getCurrentBalance()).toBe(userModel.currentBalance);
    })

    it('must throw error when user does not exists', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(undefined);

      const user = sut.findByIdentityProviderId('id');
      await expect(user).rejects.toThrowError(UserNotFound);
    })
  })

  describe('Find by email', () => {
    it('should call repository.', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(userModel);

      const user = await sut.findByEmail('email');
      expect(user.getEmail()).toBe(userModel.email);
      expect(user.getId()).toBe(userModel.id);
      expect(user.getStatusId()).toBe(userModel.statusId);
      expect(user.getCurrentBalance()).toBe(userModel.currentBalance);
    })

    it('must throw error when user does not exists', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(undefined);

      const user = sut.findByEmail('email');
      await expect(user).rejects.toThrowError(UserNotFound);
    })
  })

  describe('Update balance', () => {
    it('should update balance', async () => {
      const updateSpy = jest
        .spyOn(repository, 'update')
        .mockResolvedValueOnce(undefined);

      const user = new User(1, 'email', 1, 100)

      await sut.updateBalance(user);
      expect(updateSpy).toHaveBeenCalledTimes(1);
    })
  })

});
