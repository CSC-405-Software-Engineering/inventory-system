import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { InventoryModule } from '../inventory/inventory.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stock]),
    InventoryModule,
    // EventEmitterModule.forRoot({
    //   // set this to `true` to use wildcards
    //   wildcard: false,
    //   // the delimiter used to segment namespaces
    //   delimiter: '.',
    //   // set this to `true` if you want to emit the newListener event
    //   newListener: false,
    //   // set this to `true` if you want to emit the removeListener event
    //   removeListener: false,
    //   // the maximum amount of listeners that can be assigned to an event
    //   maxListeners: 10,
    //   // show event name in memory leak message when more than maximum amount of listeners is assigned
    //   verboseMemoryLeak: false,
    //   // disable throwing uncaughtException if an error event is emitted and it has no listeners
    //   ignoreErrors: false,
    // }),
    NotificationModule,
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
