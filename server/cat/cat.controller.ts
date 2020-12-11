import { Controller, Get, Param, Post, Body, Req, UseGuards } from '@nestjs/common';
import { CatService } from './cat.service';
import { AuthGuard } from '@nestjs/passport';

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

    @UseGuards(AuthGuard('jwt'))
    @Post('/vote')
    vote(@Body() body, @Req() req) {
        return this.catService.vote(body.catId, req.user.id)
    }

}