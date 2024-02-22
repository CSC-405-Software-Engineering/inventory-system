import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { PasswordService } from './password.service';
import { LoginUserDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  
  constructor(
    private jwtService: JwtService,
    private passwordService: PasswordService,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}


  async create (createUserDto: CreateUserDto){
    const {email, password, role} = createUserDto
    const existingAuth = await this.findByEmail(email);

    if (existingAuth) {
      throw new Error('User already exists');
    }


    const hashedPassword = await this.passwordService.hashPassword(password);

    const newAuth = this.authRepository.create({
      email,
      password: hashedPassword,
      role,
    });

    return await this.authRepository.save(newAuth);

  }

  async findByEmail(email: string) {
    return await this.authRepository.findOne({ where: { email }, relations: ['user']});
  }

  async login(loginUserDto: LoginUserDto) {
    const auth = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    const payload = { sub: auth.user.id };
    console.log("Here in login")
    return {
      access_token: this.jwtService.sign(payload),
      userId: auth.user.id
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const auth = await this.findByEmail(email);

    if (!auth) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await this.passwordService.comparePassword(
      password,
      auth.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Omit sensitive fields like password from the returned user object
    const { password: _, ...authInfo } = auth;
    return authInfo;
  }

  async findOne(id: string) {
    return await this.authRepository.findOne({ where: { id }});
  }

  

}
