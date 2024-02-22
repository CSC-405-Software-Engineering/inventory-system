import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,

    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const userAuth = await this.findByEmail(email);
    if (userAuth.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: userAuth.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.authRepository.findOne({ where: { email } });
  }
}
