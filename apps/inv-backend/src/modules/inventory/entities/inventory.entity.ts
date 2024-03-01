import { Stock } from 'src/modules/stock/entities/stock.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany, ManyToOne } from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @OneToMany(() => Stock, stock => stock.inventory)
  stocks: Stock[];

  @Column({ default: () => 'CURRENT_TIMESTAMP'})
  dateCreated: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  dateUpdated: Date;
  
  @ManyToOne(() => User, user => user.inventory)
  user: User;

}
