import {
    BaseEntity,
    Entity,
    Column,
    PrimaryColumn,
    OneToMany
} from "typeorm";
import { Like } from './like.entity';

@Entity({name: 'cat'})
export class Cat extends BaseEntity {
    @PrimaryColumn({ type: 'varchar'})
    id: string;

    @Column({ unique: true })
    url: string;

    @OneToMany(() => Like, like => like.cat)
    likes: Like[]
}