import { Inventory } from 'src/modules/inventory/entities/inventory.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Inventory, inventory => inventory.stocks)
  @JoinColumn({ name: "InventoryId" })
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
  unitPrice: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP'})
  lastPurchaseDate: Date;

  @Column()
  expirationDate: Date;

  @Column()
  location: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP'})
  dateCreated: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  dateUpdated: Date;
}