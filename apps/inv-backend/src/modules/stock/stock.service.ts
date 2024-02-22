import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity'; // Import your Stock entity
import { CreateStockDto } from './dto/createStock.dto'; // Import your DTO
import { UpdateStockDto } from './dto/updateStock.dto';
import { NotificationService } from '../notification/notification.service';
import { InventoryService } from '../inventory/inventory.service';
// import { EventEmitter2, OnEvent } from '@nestjs/event-emitter'; // Import EventEmitter2 for event handling

const LOW_STOCK_THRESHOLD = 10;
@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    // private eventEmitter: EventEmitter2, 
    private readonly notificationService: NotificationService,
    private readonly inventoryService: InventoryService,
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    
      const existingStock = await this.stockRepository.findOne({
        where: { id: createStockDto.inventoryId },
      });

      if (existingStock) {
        throw new Error('Inventory already exists for the provided product ID');
      }

      const newStock = this.stockRepository.create({
        name: createStockDto.name,
        inventory: await this.inventoryService.findOne(createStockDto.inventoryId),
        imageURL: "",
        minStock: createStockDto.minStock,
        maxStock: createStockDto.maxStock,
        quantity: createStockDto.quantity,
        unitPrice: createStockDto.unitPrice,
        location: createStockDto.location,
        expirationDate: createStockDto.expirationDate,
      });

      console.log('newStock', newStock);

      return await this.stockRepository.save(newStock);

      // Check if the new inventory has a low stock level
      // if (savedInventory.quantity < LOW_STOCK_THRESHOLD) {
      //   this.eventEmitter.emit('stock.low', savedInventory); // Emit 'stock.low' event
      // }
  
    }

    async findAll(): Promise<Stock[]> {
      return this.stockRepository.find();
    }
  

    async findOne(id: string): Promise<Stock> {
      const stock = await this.stockRepository.findOne({where: {id}});
      if (!stock) {
        throw new NotFoundException(`Stock with ID "${id}" not found`);
      }
      return stock;
    }

    async update(id: string, updateStockDto: UpdateStockDto): Promise<Stock> {
        const existingStock = await this.stockRepository.findOne({where: { id } });
    
        if (!existingStock) {
          throw new NotFoundException('Stock not found');
        }
    
        // Update properties of existing inventory with the ones provided in updateStockDto
        this.stockRepository.merge(existingStock, updateStockDto);
    
        const updatedStock = await this.stockRepository.save(existingStock);

        // Check if the updated inventory has a low stock level
        if (updatedStock.quantity < LOW_STOCK_THRESHOLD) {
          // this.eventEmitter.emit('stock.low', updatedInventory); // Emit 'stock.low' event

          // Send email notification
          this.notificationService.minimumStockEmail({email: '', stock: updatedStock, quantity: updatedStock.quantity}); 
        }
    
        return updatedStock;
      }
    
    
    
    async remove(id: string) {
        const stockToDelete = await this.stockRepository.findOne({where: { id } });
    
        if (!stockToDelete) {
          throw new NotFoundException('Stock not found');
        }
    
        await this.stockRepository.remove(stockToDelete);
    }
    
}
