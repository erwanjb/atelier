import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cors from 'cors';
import express from 'express';
import { CatService } from './cat/cat.service';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const catService = app.get(CatService);

    catService.insertCats();

    if (process.env.NODE_ENV === 'development') {
        app.use(cors({
            origin: process.env.CLIENT_URL
        }))
    } else if (process.env.NODE_ENV === 'production') {
        app.use('/', express.static('dist-react'));
    }

    await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
      }
}

bootstrap();
