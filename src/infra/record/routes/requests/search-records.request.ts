import { Transform } from "class-transformer"
import { IsDate } from "class-validator"

export class SearchRecordsRequest {
  
  @Transform(({ value }) => Number(value))
  operationId: number

  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: Date

  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate: Date

  @Transform(({ value }) => Number(value))
  page: number

  @Transform(({ value }) => Number(value))
  pageSize: number
}
