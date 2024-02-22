import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/createInventory.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}
    
    @Version('1')
    @Post('create')
    async create(@Body() createInventoryDto: CreateInventoryDto) {
      return await this.inventoryService.create(createInventoryDto);
    }
    
    @Version('1')
    @Get()
    async findAll() {
      return await this.inventoryService.findAll();
    }
    
    @Version('1')
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return await this.inventoryService.findOne(id);
    }

    @Version('1')
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateInventoryDto: CreateInventoryDto) {
      return await this.inventoryService.update(id, updateInventoryDto);
    }
  
    @Version('1')
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return await this.inventoryService.remove(id);
    } 
}
//