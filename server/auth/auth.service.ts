import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { StatusEnum } from "../user/enum/statusEnum";
import { Response } from "express";
import { User } from "../user/user.entity";
import transport from "../configs/nodemailer.config";
import crypto from "crypto-js";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
        ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);
        if (user && user.password === crypto.SHA256(pass, process.env.AUTH_SECRET as any).toString()) {
            const { password, status, ...result } = user;
            if (status === StatusEnum.ENABLED) {
                return result;
            }
            return null;
        }
        return null;
    }

    async login(user: User) {
        const { password, status,  ...payload } = { ...user };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async confirmToken(id: string, token: string, res: Response) {
        const found = await this.usersService.findByToken(id, token);
        found.confirmToken = null;
        found.status = StatusEnum.ENABLED;
        found.save();
        res.redirect(process.env.CLIENT_URL);
    }

    async sendResetPassword (email: string) {
        const user = await this.usersService.findByEmail(email);

        let confirmToken;
        let verifyToken;

        do {
            confirmToken = crypto.lib.WordArray.random(16).toString();
            verifyToken = await this.usersService.verifyToken(confirmToken);
        } while (verifyToken);

        user.confirmToken = confirmToken;
        user.save()
        await transport.sendMail({
            from: 'ne-pas-repondre@catmash.fr',
            to: email,
            subject: 'refaire le mot de passe',
            html: `Si vous voulez changer votre mot de passe sur Cat Mash, clickez sur le lien <a href="${process.env.CLIENT_URL}/resetPassword/${user.id}/${confirmToken}">ICI</a>`
        }, null);

        return 'Email envoyé';
    }

    async resetPassword (userId: string, token: string, password: string) {
        const user = await this.usersService.findByIdResetPassword(userId, token);
        
        user.password = crypto.SHA256(password, process.env.AUTH_SECRET as any).toString();
        user.confirmToken = null;
        user.save();
        
        return 'Mot de passe changé';
    }
}