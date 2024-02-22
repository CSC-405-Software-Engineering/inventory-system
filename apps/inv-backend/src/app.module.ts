import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

import { NotificationModule } from './modules/notification/notification.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InventoryModule } from './modules/inventory/inventory.module';
import { StockModule } from './modules/stock/stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
    InventoryModule,
    StockModule,
    NotificationModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
