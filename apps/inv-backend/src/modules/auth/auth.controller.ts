import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Version('1')
  @Post('login')
  async signIn(@Body() loginUserDto :LoginUserDto) {
    const data = await this.authService.login(loginUserDto)
    console.log(data)
    // return this.authService.login(loginUserDto);
    return data;
  }

  // @Version('1')
  // @Post('register')
  // register(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.register(createUserDto);
  // }


}
