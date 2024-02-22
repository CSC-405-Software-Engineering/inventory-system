import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Inventory } from 'src/modules/inventory/entities/inventory.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @OneToOne(() => Auth, (auth) => auth.user)
  @JoinColumn()
  auth: Auth;

  @OneToMany(() => Inventory, (inventory) => inventory.user)
  inventory: Inventory[];
  
}
