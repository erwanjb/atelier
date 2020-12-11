
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from './configs/typeorm.config';
import { CatModule } from './cat/cat.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        CatModule,
        UserModule,
        AuthModule,
        TypeOrmModule.forRoot(typeOrmConfig),
    ],
    controllers: [AppController]
})
export class AppModule { }