import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { PasswordService } from './password.service';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async findByEmail(email: string) {
    return await this.authRepository.findOne({ where: { email } });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    const payload = { sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Omit sensitive fields like password from the returned user object
    const { password: _, ...userInfo } = user;
    return userInfo;
  }

  findOne(id: string) {
    return this.authRepository.findOne({ where: { id }});
  }
}
