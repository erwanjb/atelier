
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from './configs/typeorm.config';
import { CatModule } from './cat/cat.module';

@Module({
    imports: [
        CatModule,
        TypeOrmModule.forRoot(typeOrmConfig),
    ],
    controllers: [AppController]
})
export class AppModule { }