import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  image?: string;


}
