import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from './password.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
// import { VerifyLogin } from './guard/verifylogin.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '6h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
