import { v4 as uuid } from 'uuid';
import { Operation } from '../../calculator/entity/operation';
import { User } from '../../user/entity/user';
import { Entity } from '../../../@shared/entity/entity.abstract';
import { RecordValidatorFactory } from '../validator/record-validator.factory';
import { InvalidDataError } from '../../../@shared/error/invalid-data.error';

export class Record extends Entity {
  private constructor(
    private readonly id: string,
    private readonly operationId: number,
    private readonly userId: number,
    private readonly amount: number,
    private readonly userBalance: number,
    private readonly operationResponse: string,
    private deleted: boolean,
    private readonly createdAt: Date,
  ) {
    super();
  }

  public static createNewRecord(
    user: User,
    operation: Operation,
    result: string,
  ) {
    const record = new Record(
      uuid(),
      operation.getId(),
      user.getId(),
      operation.getCost(),
      user.getCurrentBalance(),
      result,
      false,
      new Date(),
    );
    const isValid = RecordValidatorFactory.create().isValid(record);
    if (!isValid) {
      throw new InvalidDataError(record.notification.messages('record'));
    }
    return record;
  }

  public static createFromExistingRecord(
    id: string,
    operationId: number,
    userId: number,
    amount: number,
    userBalance: number,
    operationResponse: string,
    isDeleted: boolean,
    createdAt: Date,
  ) {
    return new Record(
      id,
      operationId,
      userId,
      amount,
      userBalance,
      operationResponse,
      isDeleted,
      createdAt,
    );
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

  public isDeleted(): boolean {
    return this.deleted;
  }

  public deleteRecord(): void {
    this.deleted = true;
  }
}
