import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from "./user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    exports: [
        UserService
    ],
    imports: [
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService
    ],
})
export class UserModule { }
