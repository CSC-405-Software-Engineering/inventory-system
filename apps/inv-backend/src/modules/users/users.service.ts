import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Auth } from '../auth/entities/auth.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { PasswordService } from '../auth/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly authService: AuthService
  ) {}

  async create(firstName: string, lastName: string, auth: Auth) {

    const newUser = this.userRepository.create({ firstName, lastName, auth });
    return await this.userRepository.save(newUser); 
  }

  async findById(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id}, relations: ['auth']});
  }

  async findAll() {
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

  async findOneByAuthId(authId: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { auth: { id: authId } },
      relations: ['auth'],
    });
  }

  async register(createUserDto : CreateUserDto) {
    const { firstName, lastName, role } = createUserDto;

    const auth = await this.authService.create(createUserDto)    

    const newUser = await this.create(firstName, lastName, auth);

    return await this.userRepository.save(newUser);
  }
}
