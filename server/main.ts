import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import cors from 'cors';
import express, { RequestHandler, Request, Response, NextFunction } from 'express';
import { CatService } from './cat/cat.service';
import history from 'connect-history-api-fallback';

const unless = (path: string, middleware: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (path === req.path) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};

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
        app.use(unless('/auth/confirmToken/me/token', history()));
        app.use('/', express.static('dist-react'));
    }

    await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
