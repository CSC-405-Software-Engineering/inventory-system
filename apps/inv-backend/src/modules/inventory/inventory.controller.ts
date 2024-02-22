import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service'; // Make sure you have InventoryService defined

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: any) {

    return this.inventoryService.create(createInventoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.inventoryService.findOne(id);
  }
}
