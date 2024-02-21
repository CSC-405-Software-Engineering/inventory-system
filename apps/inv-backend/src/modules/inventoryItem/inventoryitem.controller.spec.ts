import { Test, TestingModule } from '@nestjs/testing';
import { InventoryItemService } from './inventoryItem.service';

describe('InventoryService', () => {
  let service: InventoryItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryItemService],
    }).compile();

    service = module.get<InventoryItemService>(InventoryItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
