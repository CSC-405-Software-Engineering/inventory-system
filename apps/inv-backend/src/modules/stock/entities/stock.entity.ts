import { Inventory } from 'src/modules/inventory/entities/inventory.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Inventory, inventory => inventory.stocks)
  @JoinColumn({ name: "InventoryID" })
  inventory: Inventory;

  @Column()
  imageURL: string;

  @Column()
  minStock: number;

  @Column()
  maxStock: number;

  @Column({nullable: true})
  quantity: number;

  @Column()
  unitprice: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP'})
  last_purchase_date: Date;

  @Column()
  expiration_date: Date;

  @Column()
  location: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP'})
  datecreated: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  dateupdated: Date;
}