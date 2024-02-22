import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/createInventory.dto';
import { UpdateInventoryDto } from './dto/updateInventory.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly inventoryRepository: Repository<Inventory>,
    private readonly usersService: UsersService,
  ) {}

  async create(createInventoryDto: CreateInventoryDto, userId: string): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { name: createInventoryDto.name },
    });
    if (inventory) {
      throw new NotFoundException(
        `Inventory with name ${createInventoryDto.name} already exists`,
      );
    }
    const newInventory = this.inventoryRepository.create({
      ...createInventoryDto,
      user: await this.usersService.findById(userId),
    });
    return await this.inventoryRepository.save(newInventory);
  }

  async update(
    id: string,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    const existingInventory = await this.inventoryRepository.findOne({
      where: { id },
    });

    if (!existingInventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    this.inventoryRepository.merge(existingInventory, updateInventoryDto);
    return await this.inventoryRepository.save(existingInventory);
  }

  async findAll() {
    return await this.inventoryRepository.find();
  }

  async findOne(id: string){
    const inventory = await this.inventoryRepository.findOne({where: {id}});
    if (!inventory) {
      throw new NotFoundException(`Inventory with ID "${id}" not found`);
    }

    return inventory;
  }

  async remove(id: string): Promise<Inventory> {
    const existingInventory = await this.findOne(id);
    if (!existingInventory) {
      throw new NotFoundException(`Inventory with ID ${id} not found`);
    }

    return await this.inventoryRepository.remove(existingInventory);
  }
}
