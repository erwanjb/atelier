import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController, ReqUser, BodyEmail, BodyReset } from './auth.controller';
import { User } from '../user/user.entity';
import mailer from "nodemailer";

jest.mock("nodemailer");
jest.mock("nodemailer-mailgun-transport");

const mockedNodemailer = () => {
    return {
        sendMail: jest.fn()
    }
}
const nodemailer = mailer.createTransport as jest.Mock;
nodemailer.mockReturnValue(mockedNodemailer)

describe('The AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;
    let login: jest.Mock;
    let confirmToken: jest.Mock;
    let sendResetPassword: jest.Mock;
    let resetPassword: jest.Mock;
    beforeEach(async () => {
        login = jest.fn();
        confirmToken = jest.fn();
        sendResetPassword = jest.fn();
        resetPassword = jest.fn();
        const module = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        login,
                        confirmToken,
                        sendResetPassword,
                        resetPassword
                    }
                }
            ],
        })
            .compile();
        authController = await module.get(AuthController);
    })

    describe('login', () => {
        const mockedLogin: any = undefined;
        const req: ReqUser = {
            user: new User()
        } as ReqUser;
        beforeEach(() => {
            login.mockReturnValue(Promise.resolve(mockedLogin));
        })
        it('should login', async () => {
            const fetchedAuth = await authController.login(req);
            expect(fetchedAuth).toEqual(mockedLogin);
        })
    })

    describe('confirmToken', () => {
        const res: any = {};
        const token = 'token';
        const id = 'id';
        it('should confirm token', async () => {
            await authController.confirmToken(token, id, res);
            expect(confirmToken).toBeCalledTimes(1);
        })
    })

    describe('sendResetPassword', () => {
        const mockedResetPassword: any = undefined;
        const body: BodyEmail = {
            email: "email@tt.fr"
        }
        beforeEach(() => {
            sendResetPassword.mockReturnValue(Promise.resolve(mockedResetPassword));
        })
        it('should send Reset Password', async () => {
            const fetchedAuth = await authController.sendResetPassword(body);
            expect(fetchedAuth).toBe(mockedResetPassword);
        })
    })

    describe('resetPassword', () => {
        const mockedResetPassword: any = undefined;
        const body: BodyReset = {
            userId: 'userId',
            token: 'token',
            password: 'pwd'
        }
        beforeEach(() => {
            resetPassword.mockReturnValue(Promise.resolve(mockedResetPassword));
        })
        it('should confirm token', async () => {
            const fetchedAuth = await authController.resetPassword(body);
            expect(fetchedAuth).toBe(mockedResetPassword);
        })
    })
})