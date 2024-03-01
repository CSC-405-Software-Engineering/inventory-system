import { IsNotEmpty, IsString, ArrayMinSize, IsEmpty } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsEmpty()
  readonly userId: string;
}