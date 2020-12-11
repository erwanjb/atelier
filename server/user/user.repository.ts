import {
    Repository,
    EntityRepository
} from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from './dto/create.user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(user: CreateUserDto) {
        await this.createQueryBuilder()
            .insert()
            .into(User)
            .values(user)
            .execute();
        const newUser = await this.findOne({
            email: user.email
        });
        return newUser;
    }
}