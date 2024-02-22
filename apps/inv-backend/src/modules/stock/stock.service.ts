import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity'; // Import your Stock entity
import { CreateStockDto } from './dto/createStock.dto'; // Import your DTO
import { UpdateStockDto } from './dto/updateStock.dto';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(Stock) private readonly stockRepository: Repository<Stock>,
        private readonly inventoryService: InventoryService,
    ) {}

    async create(createStockDto: CreateStockDto) {
        const stock = await this.stockRepository.findOne({ where: { name: createStockDto.name } });
        const inventory = await this.inventoryService.findOne(createStockDto.inventoryId);

        if (!inventory) {
            throw new NotFoundException(`Inventory with ID ${createStockDto.inventoryId} not found`);
        }

        if (stock) {
            throw new NotFoundException(`Stock with name ${createStockDto.name} already exists`);
        }

        const newStock = this.stockRepository.create(createStockDto);
        return await this.stockRepository.save(newStock);
    }

    async findAll() {
        return await this.stockRepository.find();
    }

    async findOne(id: string) {
        const stock = await this.stockRepository.findOne({ where: { id } });

        if (!stock) {
            throw new NotFoundException(`Stock with ID ${id} not found`);
        }

        return stock;
    }
    
    async update(id: string, updateStockDto: UpdateStockDto) {
        const existingStock = await this.stockRepository.findOne({ where: { id } });

        if (!existingStock) {
            throw new NotFoundException(`Stock with ID ${id} not found`);
        }

        Object.assign(existingStock, updateStockDto);
        return await this.stockRepository.save(existingStock);

    }

    async remove(id: string) {
        const stock = await this.stockRepository.findOne({ where: { id } });

        if (!stock) {
            throw new NotFoundException(`Stock with ID ${id} not found`);
        }

        return await this.stockRepository.remove(stock);
    }
}
