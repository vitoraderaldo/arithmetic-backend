import { v4 as uuid } from "uuid";
import { Operation } from "../../calculator/entity/operation";
import { User } from "../../user/entity/user";

export class Record {

  private constructor(
    private readonly id: string,
    private readonly operationId: number,
    private readonly userId: number,
    private readonly amount: number,
    private readonly userBalance: number,
    private readonly operationResponse: string,
    private readonly createdAt: Date,
  ) {}

  public static createNewRecord(user: User, operation: Operation, result: string) {
    return new Record(uuid(), operation.getId(), user.getId(), operation.getCost(), user.getCurrentBalance(), result, new Date())
  }

  public static createFromExistingRecord(id: string, operationId: number, userId: number, amount: number, userBalance: number, operationResponse: string, createdAt: Date) {
    return new Record(id, operationId, userId, amount, userBalance, operationResponse, createdAt)
  }

  public getId(): string {
    return this.id;
  }

  public getOperationId(): number {
    return this.operationId;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getUserBalance(): number {
    return this.userBalance;
  }

  public getOperationResponse(): string {
    return this.operationResponse;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

}
