import { Stock } from 'src/modules/stock/entities/stock.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @OneToMany(() => Stock, stock => stock.inventory)
  stocks: Stock[];

}
