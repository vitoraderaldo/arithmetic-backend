import { Transform } from 'class-transformer';
import { IsDate, IsEnum } from 'class-validator';

export enum SortDirectionRequest {
  asc = 'asc',
  desc = 'desc',
}

export enum SortOptionRequest {
  operationId = 'operationId',
  amount = 'amount',
  userBalance = 'userBalance',
  operationResponse = 'operationResponse',
  dateCreated = 'dateCreated',
}

export class SearchRecordsRequest {
  @Transform(({ value }) => Number(value))
  operationId: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate: Date;

  @Transform(({ value }) => Number(value))
  page: number;

  @Transform(({ value }) => Number(value))
  pageSize: number;

  @IsEnum(SortOptionRequest)
  sortBy: SortOptionRequest;

  @IsEnum(SortDirectionRequest)
  sortDirection: SortDirectionRequest;
}
