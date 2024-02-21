import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
    ) {}

    async create(inventory: Inventory): Promise<Inventory> {
        const newInventory = this.inventoryRepository.create(inventory);
        return await this.inventoryRepository.save(newInventory);
    }

    async update(id: string, inventory:Inventory): Promise<Inventory> {
        const existingInventory = await this.inventoryRepository.findOne({ where: { id } });

        if (!existingInventory) {
            throw new NotFoundException(`Inventory with ID ${id} not found`);
        }

        this.inventoryRepository.merge(existingInventory, inventory);
        return await this.inventoryRepository.save(existingInventory);
    }

    async findOne(id: string): Promise<Inventory | null> {
        const options: FindOneOptions<Inventory> = {
          where: { id },
        };
    
        const inventory = await this.inventoryRepository.findOne(options);
        return inventory;
      }
    
}
