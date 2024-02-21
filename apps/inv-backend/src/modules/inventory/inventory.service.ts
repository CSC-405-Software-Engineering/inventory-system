import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
    constructor(
        @InjectRepository(Inventory)
        private readonly inventoryRepository: Repository<Inventory>,
    ) {}

    async createInventory(inventory: Inventory): Promise<Inventory> {
        const newInventory = this.inventoryRepository.create(inventory);
        return await this.inventoryRepository.save(newInventory);
    }

    async updateInventory(id: string, inventory:Inventory): Promise<Inventory> {
        const existingInventory = await this.inventoryRepository.findOne({ where: { id } });

        if (!existingInventory) {
            throw new NotFoundException(`Inventory with ID ${id} not found`);
        }

        this.inventoryRepository.merge(existingInventory, inventory);
        return await this.inventoryRepository.save(existingInventory);
    }
}
