import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity'; // Import your Stock entity
import { CreateStockDto } from './dto/createStock.dto'; // Import your DTO
import { UpdateStockDto } from './dto/updateStock.dto';
import { EventEmitter2 } from '@nestjs/event-emitter'; // Import EventEmitter2 for event handling

const LOW_STOCK_THRESHOLD = 10;
const HIGH_STOCK_THRESHOLD = 100; // High stock threshold
@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly inventoryRepository: Repository<Stock>,
    private readonly eventEmitter: EventEmitter2, 
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    
      const existingInventory = await this.inventoryRepository.findOne({
        where: { id: createStockDto.inventoryId },
      });

      if (existingInventory) {
        throw new Error('Inventory already exists for the provided product ID');
      }

      const newInventory = this.inventoryRepository.create(createStockDto);

      const savedInventory = await this.inventoryRepository.save(newInventory);

      // Check if the new inventory has a low stock level
      if (savedInventory.quantity < LOW_STOCK_THRESHOLD) {
        this.eventEmitter.emit('stock.low', savedInventory); // Emit 'stock.low' event
      }

       // Check if the new inventory has a high stock level
      if (savedInventory.quantity > HIGH_STOCK_THRESHOLD) {
        this.eventEmitter.emit('stock.high', savedInventory); // Emit 'stock.high' event
      }

      return savedInventory;
    }
  



    async findAll(): Promise<Stock[]> {
      return this.inventoryRepository.find();
    
    }
  

    async findOne(id: string): Promise<Stock> {
      const stock = await this.inventoryRepository.findOne({where: {id}});
      if (!stock) {
        throw new NotFoundException(`Stock with ID "${id}" not found`);
      }
      return stock;
    }

    async update(id: string, updateStockDto: UpdateStockDto): Promise<Stock> {
        const existingInventory = await this.inventoryRepository.findOne({where: { id } });
    
        if (!existingInventory) {
          throw new NotFoundException('Stock not found');
        }
    
        // Update properties of existing inventory with the ones provided in updateStockDto
        this.inventoryRepository.merge(existingInventory, updateStockDto);
    
        const updatedInventory = await this.inventoryRepository.save(existingInventory);

        // Check if the updated inventory has a low stock level
        if (updatedInventory.quantity < LOW_STOCK_THRESHOLD) {
          this.eventEmitter.emit('stock.low', updatedInventory); // Emit 'stock.low' event
        }

        // Check if the updated inventory has a high stock level
       if (updatedInventory.quantity > HIGH_STOCK_THRESHOLD) {
         this.eventEmitter.emit('stock.high', updatedInventory); // Emit 'stock.high' event
        }
    
        return updatedInventory;
      }
    
    
    
    async remove(id: string) {
        const stockToDelete = await this.inventoryRepository.findOne({where: { id } });
    
        if (!stockToDelete) {
          throw new NotFoundException('Stock not found');
        }
    
        await this.inventoryRepository.remove(stockToDelete);
    }
    
}
