import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './auth.constant';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PasswordService } from './password.service';
// import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
  exports: [AuthService],
})
export class AuthModule {}
