import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    exports: [JwtModule],
    imports: [UserModule, PassportModule, JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { /* expiresIn: '60s' */ },
      })],
    controllers: [
        AuthController, ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }