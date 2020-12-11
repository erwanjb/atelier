import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm";
import { Like } from '../cat/like.entity';
import { StatusEnum } from './enum/statusEnum';

@Entity({name: 'user'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(() => Like, cat => cat.user)
    cats: Like[];

    @Column({ type: "enum", enum: StatusEnum })
    status: StatusEnum;

    @Column()
    password: string;
    
    @Column({ nullable: true })
    confirmToken: string;
}