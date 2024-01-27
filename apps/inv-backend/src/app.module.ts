import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './typeorm.config';


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../..', 'inv-frontend','dist'),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
