import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
<<<<<<< HEAD
import { NotificationModule } from './modules/notification/notification.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
=======
import { InventoryModule } from './modules/inventory/inventory.module';
import { StockModule } from './modules/stock/stock.module';

>>>>>>> origin/development

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UsersModule,
<<<<<<< HEAD
    NotificationModule,EventEmitterModule.forRoot()],
=======
    InventoryModule,
    StockModule,],
>>>>>>> origin/development
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
