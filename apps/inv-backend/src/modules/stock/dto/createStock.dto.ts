import { IsNotEmpty, IsString, IsNumber, IsUrl, IsDate, IsOptional, IsUUID } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsUUID()
  readonly inventoryId: string;

  @IsNotEmpty()
  @IsString()
  readonly imageURL: string;

  @IsNotEmpty()
  @IsNumber()
  readonly minStock: number;

  @IsNotEmpty()
  @IsNumber()
  readonly maxStock: number;

  @IsOptional()
  @IsNumber()
  readonly quantity?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly unitPrice: number;

  @IsDate()
  readonly lastPurchaseDate: Date;

  @IsDate()
  readonly expirationDate: Date;

  @IsNotEmpty()
  @IsString()
  readonly location: string;
}
