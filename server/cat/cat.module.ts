import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { CatRepository } from "./cat.repository";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    exports: [],
    imports: [
        TypeOrmModule.forFeature([CatRepository])
    ],
    controllers: [
        CatController
    ],
    providers: [
        CatService
    ],
})
export class CatModule { }
