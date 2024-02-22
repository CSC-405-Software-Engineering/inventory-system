import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, Version } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/createInventory.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Request, response } from 'express';
import { ApiOperation } from '@nestjs/swagger';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}
    
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new stock',  })
    @Version('1')
    @Post('create')
    async create(@Body() createInventoryDto: CreateInventoryDto, @Req() request: Request, @Res() response){
      try {
        // console.log('User', request['user'])
        const inventory = await this.inventoryService.create(createInventoryDto, request['user'].id);
        response.status(HttpStatus.CREATED).json({
          status: 'success',
          message: 'Inventory created successfully',
          data: inventory,
        });
      } catch (error) {
        response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        });
      }

    }
    
    @Version('1')
    @Get()
    async findAll(@Res() response) {
      const data = await this.inventoryService.findAll();
      try {
        response.status(HttpStatus.OK).json({
          status: 'success',
          message: 'Inventory retrieved successfully',
          data: data,
        });
      } catch (error) {
        response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        });
    }
  }
    
    @Version('1')
    @Get(':id')
    async findOne(@Param('id') id: string, @Res() response){
      console.log('ID', id);
      // return await this.inventoryService.findOne(id);
      try {
        const data = await this.inventoryService.findOne(id);
        response.status(HttpStatus.OK).json({
          status: 'success',
          message: 'Inventory retrieved successfully',
          data: data,
        });
      } catch (error) {
        response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        });
      }
    }

    @Version('1')
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateInventoryDto: CreateInventoryDto, @Res() response){
      // return await this.inventoryService.update(id, updateInventoryDto);
      try {
        const inventory = await this.inventoryService.update(id, updateInventoryDto);
        response.status(HttpStatus.OK).json({
          status: 'success',
          message: 'Inventory updated successfully',
          data: inventory,
        });
      } catch (error) {
        response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        });
      }
    }
  
    @Version('1')
    @Delete(':id')
    async remove(@Param('id') id: string) {
      // return await this.inventoryService.remove(id);
      try {
        await this.inventoryService.remove(id);
        response.status(HttpStatus.OK).json( {
          status: 'success',
          message: 'Inventory deleted successfully',
        });
      } catch (error) {
        return {
          status: 'error',
          message: error.message,
        };
      }
    } 
}
//