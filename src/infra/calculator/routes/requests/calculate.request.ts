import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from "class-validator"

export class CalculateAdditionRequest {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  arguments: number[]
}
