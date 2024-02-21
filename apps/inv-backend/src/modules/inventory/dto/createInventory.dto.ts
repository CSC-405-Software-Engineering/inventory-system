import { IsNotEmpty, IsString, ArrayMinSize } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

}