import { Module } from '@nestjs/common';
import { InventoryItemController } from './inventoryitem.controller';
import { InventoryItemService} from './inventoryitem.service';

@Module({
  controllers: [InventoryItemController],
  providers: [InventoryItemService]
})
export class InventoryItemModule {}