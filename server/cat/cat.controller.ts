import { Controller, Get, Param } from '@nestjs/common';
import { CatService } from './cat.service';

@Controller('/cats')
export class CatController {
    constructor(private readonly catService: CatService) {}

    @Get()
    getCats() {
        return this.catService.getCats();
    }

    @Get('/one/:id')
    getCatById(@Param("id") id: string) {
        return this.catService.getCatById(id);
    }

    @Get('/getTwoCatsRandom')
    getTwoCatsRandom() {
        return this.catService.getTwoCatsRandom()
    }

}