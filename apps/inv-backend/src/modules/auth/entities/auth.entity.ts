// import { Users } from 'src/modules/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';


@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    authID: number;

    @Column({ unique: true, length: 50 })
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToOne(() => User, (user) => user.auth)
    user: User;
}
