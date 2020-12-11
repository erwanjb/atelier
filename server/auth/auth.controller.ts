import { Controller, Request, Response, Get, Query, Post, UseGuards, Body, Param, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('/confirmToken/me/token')
    confirmToken(@Query('token') token, @Query('id') id, @Response() res) {
        this.authService.confirmToken(id, token, res);
    }

    @Post('/sendResetPassword')
    sendResetPassword(@Body() body) {
        return this.authService.sendResetPassword(body.email);
    }

    @Post('/resetPassword')
    resetPassword(@Body() body) {
        return this.authService.resetPassword(body.userId, body.token, body.password);
    }
}
