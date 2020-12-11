import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Cat } from "../cat/cat.entity";
import { Like } from "../cat/like.entity";
import { User } from "../user/user.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.TYPEORM_HOST,
    port: parseInt(process.env.TYPEORM_PORT) || 5432,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [Cat, Like, User],
    synchronize: true,
};