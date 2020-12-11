import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from './user.entity';
import { StatusEnum } from './enum/statusEnum';
import transport from '../configs/nodemailer.config';
import shA256  from "crypto-js/sha256";
import crypto from "crypto-js";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async create(user) {
        const userLoaded = {...user};
        userLoaded.status = StatusEnum.TO_CONFIRM;
        const { email } = userLoaded;

        const found = await this.userRepository.findOne({
            email,
        });

        if (found) {
            throw new ConflictException();
        }

        let confirmToken;
        let verifyToken;
        do {
            confirmToken = crypto.lib.WordArray.random(16).toString();
            verifyToken = await this.verifyToken(confirmToken);
        } while (verifyToken);
        userLoaded.confirmToken = confirmToken;
        userLoaded.password = shA256(userLoaded.password, process.env.AUTH_SECRET).toString();

        const newUser = await this.userRepository.createUser(userLoaded);

        if (!found) {
            await this.createConfirmMail(newUser.id, userLoaded.email, confirmToken);
        }
        return 'User créé, mail envoyé'
    }

    async findByEmail(email: string): Promise<User> {
        const found = await this.userRepository.findOne({
            email,
            status: StatusEnum.ENABLED
        });

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async findByIdResetPassword(id: string, token: string) {
        const found = await this.userRepository.findOne({
            id,
            confirmToken: token,
            status: StatusEnum.ENABLED
        });

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async findByToken(id: string, token: string) {
        const found = await this.userRepository.findOne({
            id,
            confirmToken: token,
        });

        if (!found) {
            throw new NotFoundException();
        }
        return found;
    }

    async verifyToken(token: string): Promise<boolean> {
        const found = await this.userRepository.findOne({
            confirmToken: token,
        });

        if (found) {
            return true;
        }

        return false;
    }

    async createConfirmMail(id: string, email: string, token: string) {
        await transport.sendMail({
            from: 'ne-pas-repondre@catmash.fr',
            to: email,
            subject: 'confirmation de création de compte',
            html: `Un compte a été créé sur CatMash avec votre adresse mail, si c'est bien vous qui l'avez créé, clickez sur le lien <a href="${process.env.API_URL}/auth/confirmToken/me/token?token=${token}&id=${id}">ICI</a>` 
        }, null)
    }
}