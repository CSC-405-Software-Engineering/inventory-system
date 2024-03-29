import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  NotFoundException,
  Res,
  Version,
} from '@nestjs/common';
import { CreateStockDto } from './dto/createStock.dto';
import { UpdateStockDto } from './dto/updateStock.dto';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StockService } from './stock.service';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }

  @Version('1')
  @Post('create')
  @ApiOperation({ summary: 'Create a new stock' })
  @ApiResponse({ status: 201, description: 'Stock successfully created' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiBody({ type: CreateStockDto, description: 'Stock creation details' })
  @ApiProperty({example: {name: 'Stock Name', quantity: 10, inventoryId: 'Inventory ID', imageUrl: 'Image URL', minStock: 5, maxStock: 20, unitPrice: 1000, location: "Fridge",  expirtationDate: "2022-12-12"}})
  async create(@Body() createStockDto: CreateStockDto, @Res() response) {
    try {
      const stock = await this.stockService.create(createStockDto);
      response.status(HttpStatus.CREATED).json({
        status: 'success',
        message: 'Stock created successfully',
        data: stock,
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Version('1')
  @Get()
  @ApiOperation({ summary: 'Get all stock' })
  @ApiResponse({ status: 200, description: 'Stock successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Stock not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findAll(@Res() response) {
    try {
      const data = await this.stockService.findAll();

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Stock retrieved successfully',
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
  @ApiOperation({ summary: 'Get Stock by ID' })
  @ApiResponse({ status: 200, description: 'Stock successfully retrieved' })
  @ApiResponse({ status: 404, description: 'Stock not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', required: true, description: 'Stock ID' })
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const stock = await this.stockService.findOne(id);
      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Stock retrieved successfully',
        data: stock,
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Version('1')
  @Patch(':id')
  @ApiOperation({ summary: 'Update Stock by ID' })
  @ApiResponse({ status: 200, description: 'Stock successfully updated' })
  @ApiResponse({ status: 404, description: 'Stock not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', required: true, description: 'Stock ID' })
  @ApiBody({ type: UpdateStockDto, description: 'Stock update details'})
  async update(
    @Param('id') id: string,
    @Body() UpdateStockDto: UpdateStockDto,
    @Res() response,
  ) {
    try {
      const updatedStock = await this.stockService.update(id, UpdateStockDto);

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Stock updated successfully',
        data: updatedStock,
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }

  @Version('1')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete stock by ID' })
  @ApiResponse({ status: 200, description: 'Stock successfully deleted' })
  @ApiResponse({ status: 404, description: 'Stock not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiParam({ name: 'id', required: true, description: 'Stock ID' })
  async remove(@Param('id') id: string, @Res() response) {
    try {
      const stockToDelete = await this.stockService.findOne(id);

      if (!stockToDelete) {
        throw new NotFoundException(`Stock with id: ${id} not found`);
      }

      this.stockService.remove(id);

      response.status(HttpStatus.OK).json({
        status: 'success',
        message: 'Stock deleted successfully',
        data: stockToDelete,
      });
    } catch (error) {
      response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      });
    }
  }
}
