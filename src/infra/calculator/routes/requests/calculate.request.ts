import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from "class-validator"

class CalculateNumbersRequest {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  arguments: number[]
}

export class CalculateSquareRootRequest {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  @IsNumber({}, { each: true })
  arguments: number[]
}

export class CalculateAdditionRequest extends CalculateNumbersRequest {}
export class CalculateSubtractionRequest extends CalculateNumbersRequest {}
export class CalculateMultiplicationRequest extends CalculateNumbersRequest {}
export class CalculateDivisionRequest extends CalculateNumbersRequest {}
