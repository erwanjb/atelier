import { Controller, Request, Response, Get, Query, Post, UseGuards, Body, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Request as ReqExpress, Response as ResExpress } from 'express';
import { User } from '../user/user.entity';

interface ReqUser extends ReqExpress{
    user: User;
}

interface BodyEmail {
    email: string;
}

interface BodyReset {
    userId: string;
    token: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req: ReqUser) {
        return this.authService.login(req.user);
    }

    @Get('/confirmToken/me/token')
    confirmToken(@Query('token') token: string, @Query('id') id: string, @Response() res: ResExpress) {
        this.authService.confirmToken(id, token, res);
    }

    @Post('/sendResetPassword')
    sendResetPassword(@Body() body: BodyEmail) {
        return this.authService.sendResetPassword(body.email);
    }

    @Post('/resetPassword')
    resetPassword(@Body() body: BodyReset) {
        return this.authService.resetPassword(body.userId, body.token, body.password);
    }
}
