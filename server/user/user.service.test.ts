import { Test } from '@nestjs/testing';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import crypto from 'crypto-js';
import transport from "../configs/nodemailer.config";
import { StatusEnum } from './enum/statusEnum';

interface SHAInterface  {
    toString: () => any
}

jest.mock("../configs/nodemailer.config");

jest.mock("nodemailer");
jest.mock("nodemailer-mailgun-transport");

jest.mock("crypto-js");
jest.mock("../configs/nodemailer.config", () => ({
    ...(jest.requireActual('../configs/nodemailer.config')),
    sendMail: jest.fn()
}))

describe('The CatController', () => {
    let userService: UserService;
    let findOne: jest.Mock;
    let createUser: jest.Mock;
    beforeEach(async () => {
        findOne = jest.fn();
        createUser = jest.fn();
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(UserRepository),
                    useValue: {
                        findOne,
                        createUser
                    }
                }
            ],
        })
            .compile();
            userService = await module.get(UserService);
    })

    describe('create', () => {
        let user: User;
        const response: string = 'User créé, mail envoyé';
        beforeEach(() => {
            user = {
                id: 'id',
                email: 'email@email.fr',
                password: 'pwd',
                confirmToken: null,
                status: StatusEnum.DISABLED
            } as User;
            createUser.mockReturnValue(Promise.resolve(user));
            const mockedToString = jest.fn();
            jest.spyOn(crypto.lib.WordArray, 'random').mockReturnValue({toString: mockedToString} as any);

            const mockedString: any = user.password;
            const SHA256Mocked = (): SHAInterface => {
                return {
                    toString: (): any => {
                        return mockedString
                    }
                }
            };
            jest.spyOn(crypto, 'SHA256').mockReturnValue(SHA256Mocked() as any);
            ( transport.sendMail as any).mockReturnValue(undefined)
        })
        it('should return the response', async () => {
            findOne.mockReturnValue(Promise.resolve(null));
            const fetchedCat = await userService.create(user as User);
            expect(fetchedCat).toEqual(response);
        })

        it('should throw', async () => {
            findOne.mockReturnValue(Promise.resolve(user));
            expect(() => userService.create(user as User)).toThrow
        })
    })

    describe('findByEmail', () => {
        const user = new User()

        it('should return user', async() => {
            findOne.mockReturnValue(Promise.resolve(user));
            const fetchedCat = await userService.findByEmail(user.email);
            expect(fetchedCat).toEqual(user);
        })

        it('should throw', async () => {
            findOne.mockReturnValue(Promise.resolve(null));
            expect(() => userService.findByEmail(user.email)).toThrow
        })
    })

    describe('findByIdResetPassword', () => {
        const user = new User()

        it('should return user', async() => {
            findOne.mockReturnValue(Promise.resolve(user));
            const fetchedCat = await userService.findByIdResetPassword(user.id, user.confirmToken);
            expect(fetchedCat).toEqual(user);
        })

        it('should throw', async () => {
            findOne.mockReturnValue(Promise.resolve(null));
            expect(() => userService.findByIdResetPassword(user.id, user.confirmToken)).toThrow
        })
    })

    describe('findByToken', () => {
        const user = new User()

        it('should return user', async() => {
            findOne.mockReturnValue(Promise.resolve(user));
            const fetchedCat = await userService.findByToken(user.id, user.confirmToken);
            expect(fetchedCat).toEqual(user);
        })

        it('should throw', async () => {
            findOne.mockReturnValue(Promise.resolve(null));
            expect(() => userService.findByToken(user.id, user.confirmToken)).toThrow
        })
    })

    describe('verifyToken', () => {
        const user = new User()

        it('should return user', async() => {
            findOne.mockReturnValue(Promise.resolve(user));
            const fetchedCat = await userService.verifyToken(user.confirmToken);
            expect(fetchedCat).toEqual(true);
        })

        it('should throw', async () => {
            findOne.mockReturnValue(Promise.resolve(null));
            const fetchedCat = await userService.verifyToken(user.confirmToken);
            expect(fetchedCat).toEqual(false);
        })
    })

    it('createConfirmMail', async() => {
        await userService.createConfirmMail('string', 'email@email.fr', 'token')
        expect(transport.sendMail as any).toBeCalledTimes(2);
    })
})