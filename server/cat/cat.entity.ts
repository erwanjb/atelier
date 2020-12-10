import {
    BaseEntity,
    Entity,
    Column,
    // PrimaryGeneratedColumn,
    PrimaryColumn,
} from "typeorm";

@Entity({name: 'cat'})
export class Cat extends BaseEntity {
    @PrimaryColumn({ type: 'varchar'})
    id: string;

    @Column({ unique: true })
    url: string

    @Column({ type: 'int', nullable: true })
    likes?: number
}