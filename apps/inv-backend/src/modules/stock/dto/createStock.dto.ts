import { IsNotEmpty, IsString, IsNumber, IsUUID, IsDateString } from 'class-validator';
import { DeepPartial } from 'typeorm';

export class CreateStockDto {

  @IsNotEmpty({message: 'Name is required'})
  @IsString()
  readonly name: string;

  @IsNotEmpty({message: 'Inventory ID is required'})
  @IsUUID()
  readonly inventoryId: string;

  @IsNotEmpty({message: 'imageURL is required'})
  @IsString()
  readonly imageURL: string;

  @IsNotEmpty({message: 'minStock is required'})
  @IsNumber()
  readonly minStock: number;

  @IsNotEmpty({message: 'maxStock is required'})
  @IsNumber()
  readonly maxStock: number;

  @IsNotEmpty({message: 'quantity is required'})
  @IsNumber()
  readonly quantity?: number;

  @IsNotEmpty({message: 'unitPrice is required'})
  @IsNumber()
  readonly unitPrice: number;

  // @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsDateString()
  expirationDate: DeepPartial<Date>;
}
