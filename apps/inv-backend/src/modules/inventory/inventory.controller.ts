import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/createInventory.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}
    
    @Post()
    async create(@Body() createInventoryDto: CreateInventoryDto) {
      return await this.inventoryService.create(createInventoryDto);
    }
    
    @Get()
    async findAll() {
      return await this.inventoryService.findAll();
    }
    
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return await this.inventoryService.remove(id);
    } 
}
//