import { RecordRepositoryInterface } from "../../domain/record/repository/record-repository.interface";
import { UserRepositoryInterface } from "../../domain/user/repository/user-repository.interface";
import { DeleteRecordInputDto, DeleteRecordOutputDto } from "./dto/delete-record.dto";

export class DeleteRecordUseCase {

  constructor(
    private readonly recordRepository: RecordRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute(input: DeleteRecordInputDto): Promise<DeleteRecordOutputDto> {
    const { identityProviderId, recordId } = input;
    const user = await this.userRepository.findByIdentityProviderId(identityProviderId);
    const record = await this.recordRepository.findById(recordId);
    if (record.getUserId() !== user.getId()) {
      throw new Error('Invalid record');
    }
    await this.recordRepository.deleteById(recordId);
    return {
      recordId: record.getId(),
    }
  }
}
