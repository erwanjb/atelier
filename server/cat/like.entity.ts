import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    JoinColumn,
    ManyToOne,
    Check
} from "typeorm";
import { User } from "../user/user.entity";
import { Cat } from "./cat.entity";

@Entity()
export class Like extends BaseEntity {
    @PrimaryColumn('uuid') 
    userId: string;

    @ManyToOne(() => User, user => user.cats) // inverse "userPlaces: UserPlace[]" is one-to-many in user
    @JoinColumn({ name: "userId" })
    user: User;

    @PrimaryColumn({ type: 'varchar' }) 
    catId: string;

    @ManyToOne(() => Cat, cat => cat.likes) // inverse "userPlaces: UserPlace[]" is one-to-many in place
    @JoinColumn({ name: "catId" })
    cat: Cat;
}