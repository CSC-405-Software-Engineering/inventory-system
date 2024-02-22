import {PartialType} from '@nestjs/mapped-types';
import { CreateStockDto } from './createStock.dto';

export class UpdateStockDto extends PartialType(CreateStockDto){
  
}
