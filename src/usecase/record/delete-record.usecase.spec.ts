import { createMock } from '@golevelup/ts-jest';
import { RecordRepositoryInterface } from '../../domain/record/repository/record-repository.interface';
import { UserRepositoryInterface } from '../../domain/user/repository/user-repository.interface';
import { DeleteRecordUseCase } from './delete-record.usecase';
import { User } from '../../domain/user/entity/user';
import { Record } from '../../domain/record/entity/record';
import { RecordNotFound } from '../../domain/record/error/record-not-found';

describe('Delete Record UseCase', () => {
  let useCase: DeleteRecordUseCase;
  let recordRepository: RecordRepositoryInterface;
  let userRepository: UserRepositoryInterface;

  beforeEach(() => {
    recordRepository = createMock<RecordRepositoryInterface>();
    userRepository = createMock<UserRepositoryInterface>();
    useCase = new DeleteRecordUseCase(recordRepository, userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('must be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('must delete record successfully', async () => {
    const input = { identityProviderId: '123', recordId: '456' };
    const user = new User(1, 'user@email.com', 1, 100);

    const record = Record.createFromExistingRecord(
      input.recordId,
      1,
      user.getId(),
      5,
      10,
      'response',
      false,
      new Date(),
    );

    jest
      .spyOn(userRepository, 'findByIdentityProviderId')
      .mockResolvedValue(user);

    jest.spyOn(recordRepository, 'findById').mockResolvedValue(record);

    const deleteRecordSpy = jest.spyOn(recordRepository, 'deleteById');

    const response = await useCase.execute(input);
    expect(response).toEqual({
      recordId: record.getId(),
    });
    expect(deleteRecordSpy).toHaveBeenCalledWith(input.recordId);
  });

  it('must throw exception when deleting a record from another user', async () => {
    const input = { identityProviderId: '123', recordId: '456' };
    const user = new User(1, 'user@email.com', 1, 100);

    const record = Record.createFromExistingRecord(
      input.recordId,
      1,
      141,
      5,
      10,
      'response',
      false,
      new Date(),
    );

    jest
      .spyOn(userRepository, 'findByIdentityProviderId')
      .mockResolvedValue(user);

    jest.spyOn(recordRepository, 'findById').mockResolvedValue(record);

    const deleteRecordSpy = jest.spyOn(recordRepository, 'deleteById');

    const response = useCase.execute(input);
    expect(response).rejects.toThrow('Invalid record');
    expect(response).rejects.toThrow(RecordNotFound);
    expect(deleteRecordSpy).not.toHaveBeenCalled();
  });
});
