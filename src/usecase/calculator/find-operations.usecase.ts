import { OperationRepositoryInterface } from "../../domain/calculator/repository/operation-repository.interface";
import { FindOperationDto, FindOperationsOutputDto } from "./dto/operation.dto";

export class FindOperationsUseCase {

  constructor(
    private readonly operationRepository: OperationRepositoryInterface,
  ) {}

  async execute(): Promise<FindOperationsOutputDto> {
    const operations = await this.operationRepository.findAll();
    const operationsDto = operations.map(operation => {
      const operationDto: FindOperationDto = {
        id: operation.getId(),
        name: operation.getName(),
        cost: operation.getCost(),
        inputs: operation.getInputsRequired(),
      }
      return operationDto
    })
    const response: FindOperationsOutputDto = {
      operations: operationsDto
    }
    return response;
  }
  
}
