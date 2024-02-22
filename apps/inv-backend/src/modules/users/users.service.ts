import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Auth } from '../auth/entities/auth.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(firstName: string, lastName: string, auth: Auth) {

    const newUser = this.userRepository.create({ firstName, lastName, auth });
    return await this.userRepository.save(newUser); 
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id} });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async update(id: string, firstName: string, lastName: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new ConflictException(`User with ID ${id} not found`);
    }
    user.firstName = firstName;
    user.lastName = lastName;
    return await this.userRepository.save(user);
  }
}
