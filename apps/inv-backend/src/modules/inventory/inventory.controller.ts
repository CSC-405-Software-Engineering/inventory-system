import { Controller, Delete, Get, Param } from '@nestjs/common';

@Controller('inventory')
export class InventoryController {
    InventoryService: any;
    @Get()
    async findAll() {
      return await this.InventoryService.findAll();
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return await this.InventoryService.remove(+id);
    } 
}