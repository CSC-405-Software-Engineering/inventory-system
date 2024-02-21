import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { Inventory } from 'src/modules/inventory/entities/inventory.entity';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
