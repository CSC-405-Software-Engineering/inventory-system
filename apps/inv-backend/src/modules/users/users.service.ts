import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
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

}
