import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/createInventory.dto';
import { UpdateInventoryDto } from './dto/updateInventory.dto';


@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
    ) { }

    async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
        const inventory = await this.inventoryRepository.findOne({ where: { name: createInventoryDto.name } });
        if (inventory) {
            throw new NotFoundException(`Inventory with name ${createInventoryDto.name} already exists`);
        }
        const newInventory = this.inventoryRepository.create(createInventoryDto);
        return await this.inventoryRepository.save(newInventory);
    }

    async update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
        const existingInventory = await this.inventoryRepository.findOne({ where: { id } });

        if (!existingInventory) {
            throw new NotFoundException(`Inventory with ID ${id} not found`);
        }

        this.inventoryRepository.merge(existingInventory, updateInventoryDto);
        return await this.inventoryRepository.save(existingInventory);
    }

    async findAll(): Promise<Inventory[]> {
        return this.inventoryRepository.find();
    }

    async findOne(id: string): Promise<Inventory | null> {
        const options: FindOneOptions<Inventory> = {
            where: { id },
        };
    
        const inventory = await this.inventoryRepository.findOne(options);
        return inventory;
      }

    async remove(id: string): Promise<Inventory> {
        const existingInventory = await this.inventoryRepository.findOne({ where: { id } });

        if (!existingInventory) {
            throw new NotFoundException(`Inventory with ID ${id} not found`);
        }

        return await this.inventoryRepository.remove(existingInventory);
    }
}
