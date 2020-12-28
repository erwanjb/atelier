import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import transport from "../configs/nodemailer.config";
import { JwtService, JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StatusEnum } from "../user/enum/statusEnum";
import crypto from "crypto-js";

jest.mock("crypto-js");
jest.mock("../configs/nodemailer.config", () => ({
    ...(jest.requireActual('../configs/nodemailer.config')),
    sendMail: jest.fn()
}))

let mockedEmail: jest.Mock;
mockedEmail = jest.fn();
jest.mock("nodemailer", () => ({
    ...(jest.requireActual('nodemailer')),
    createTransport: jest.fn()
}));
jest.mock("nodemailer-mailgun-transport");

const mockedNodemailer = () => {
    return {
        sendMail: mockedEmail
    }
}

const mockedRandomToString: jest.Mock = jest.fn();


const random = (someNumber: number) => {
    return {
        toString: mockedRandomToString
    }
}

describe('The AuthService', () => {
    let mockedSign: jest.Mock;
    let authService: AuthService;
    let findByEmail: jest.Mock;
    let findByToken: jest.Mock;
    let verifyToken: jest.Mock;
    let findByIdResetPassword: jest.Mock;
    beforeEach(async () => {
        findByEmail = jest.fn();
        findByToken = jest.fn();
        verifyToken = jest.fn();
        findByIdResetPassword = jest.fn();
        mockedSign = jest.fn();
        const module = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secretOrPrivateKey: 'secretKey',
                    signOptions: {},
                }),
                PassportModule.register({ defaultStrategy: 'jwt' })
            ],
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        findByEmail,
                        findByToken,
                        verifyToken,
                        findByIdResetPassword
                    }
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: mockedSign
                    }
                }
            ],
        })
            .compile();
        authService = await module.get(AuthService);
    })

    describe('validateUser', () => {
        let mockedFindByEmail: Function
        const user = {
            email: 'toto@toto.fr',
            password: 'haha',
            id: 'smthg',
            status: StatusEnum.ENABLED
        }
        const mockedString: any = user.password;
        interface SHAInterface {
            toString: () => any
        }
        const SHA256Mocked = (): SHAInterface => {
            return {
                toString: (): any => {
                    return mockedString
                }
            }
        };

        it('should return a result user', async () => {
            mockedFindByEmail = () => user;
            findByEmail.mockReturnValue(mockedFindByEmail());
            jest.spyOn(crypto, 'SHA256').mockReturnValue(SHA256Mocked() as any);
            const authFetched = await authService.validateUser(user.email, user.password)
            expect(authFetched).toEqual({
                id: user.id,
                email: user.email
            });
        })

        it('should return null', async () => {
            mockedFindByEmail = () => ({ ...user, password: 'not good password' });
            findByEmail.mockReturnValue(mockedFindByEmail());
            jest.spyOn(crypto, 'SHA256').mockReturnValue(SHA256Mocked() as any);
            const authFetched = await authService.validateUser(user.email, user.password)
            expect(authFetched).toEqual(null);
        })

        it('should return null again', async () => {
            mockedFindByEmail = () => ({ ...user, status: StatusEnum.DISABLED });
            findByEmail.mockReturnValue(mockedFindByEmail());
            jest.spyOn(crypto, 'SHA256').mockReturnValue(SHA256Mocked() as any);
            const authFetched = await authService.validateUser(user.email, user.password)
            expect(authFetched).toEqual(null);
        })
    })


    describe('login', () => {
        const user = {
            email: 'toto@toto.fr',
            password: 'haha',
            id: 'smthg',
            status: StatusEnum.ENABLED
        }

        const token = 'some token';

        beforeEach(async () => {
            mockedSign.mockReturnValue(token)
        })

        it('shoul return a token object', async () => {
            const fetched = await authService.login(user as User);
            expect(fetched).toEqual({ token })
        })
    })

    describe('confirmToken', () => {
        const saveMocked = jest.fn();
        const user = {
            email: 'toto@toto.fr',
            password: 'haha',
            id: 'smthg',
            status: StatusEnum.ENABLED,
            save: saveMocked,
            confirmToken: 'some token'
        }

        const mockedRedirect = jest.fn()

        const res = {
            redirect: mockedRedirect
        }

        beforeEach(async () => {
            findByToken.mockReturnValue(user)
        })

        it('should pass', async () => {
            await authService.confirmToken(user.id, 'the true user token', res as any);
            expect(saveMocked).toBeCalledTimes(1);
            expect(mockedRedirect).toBeCalledTimes(1);
        })
    })

    describe('sendResetPassword', () => {

        it('should return a string', async () => {
            const saveMocked = jest.fn();
            const user = {
                email: 'toto@toto.fr',
                password: 'haha',
                id: 'smthg',
                status: StatusEnum.ENABLED,
                save: saveMocked,
                confirmToken: 'some token'
            }
            findByEmail.mockReturnValue(user);
            verifyToken.mockReturnValue(false);
            const mockedToString = jest.fn();
            jest.spyOn(crypto.lib.WordArray, 'random').mockReturnValue({ toString: mockedToString } as any);
            (transport.sendMail as any).mockReturnValue(undefined)
            const fetched = await authService.sendResetPassword(user.email);
            expect(fetched).toBe('Email envoyé');
        })
    })

    describe('resetPassword', () => {
        const saveMocked = jest.fn();
        const user = {
            email: 'toto@toto.fr',
            id: 'smthg',
            status: StatusEnum.ENABLED,
            save: saveMocked,
            confirmToken: 'some token'
        }
        const pwd = 'pwd';

        beforeEach(async () => {
            const mockedString: any = pwd;
            interface SHAInterface {
                toString: () => any
            }
            const SHA256Mocked = (): SHAInterface => {
                return {
                    toString: (): any => {
                        return mockedString
                    }
                }
            };
            findByIdResetPassword.mockReturnValue(user);
            jest.spyOn(crypto, 'SHA256').mockReturnValue(SHA256Mocked() as any);
        })

        it('shoul return a token object', async () => {
            const fetched = await authService.resetPassword(user.id, 'the true user token', pwd);
            expect(fetched).toBe('Mot de passe changé');
        })
    })

})