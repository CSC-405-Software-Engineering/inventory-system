import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity'; // Import your Stock entity
import { CreateStockDto } from './dto/createStock.dto'; // Import your DTO
import { UpdateStockDto } from './dto/updateStock.dto';
@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly inventoryRepository: Repository<Stock>,
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    
      const existingInventory = await this.inventoryRepository.findOne({
        where: { id: createStockDto.inventoryId },
      });

      if (existingInventory) {
        throw new Error('Inventory already exists for the provided product ID');
      }

      const newInventory = this.inventoryRepository.create(createStockDto);

      return await this.inventoryRepository.save(newInventory);
    }
  



    async findAll() {

    }

    async findOne() {

    }

    async update(id: string, updateStockDto: UpdateStockDto): Promise<Stock> {
        const existingInventory = await this.inventoryRepository.findOne({where: { id } });
    
        if (!existingInventory) {
          throw new NotFoundException('Stock not found');
        }
    
        // Update properties of existing inventory with the ones provided in updateStockDto
        this.inventoryRepository.merge(existingInventory, updateStockDto);
    
        return await this.inventoryRepository.save(existingInventory);
      }
    
    
    
    async remove() {
    }
}
