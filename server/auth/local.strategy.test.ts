import { Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

jest.mock("nodemailer");
jest.mock("nodemailer-mailgun-transport");

describe('The LocalStrategy', () => {

    interface NewLocalStrategy {
        validate: (mocked: object) => object,
    }

    let localStrategy: LocalStrategy | NewLocalStrategy;

    const user = {
        email: 'toto@toto.fr',
        password: 'haha',
        id: 'smthg',
        confirmToken: 'some token'
    }

    const mockedAuthService = jest.fn();

    beforeEach(async () => {
        const local = new LocalStrategy({ validateUser: mockedAuthService } as any);
        class MockLocalStrategy {
            constructor() {
                this.authService = {
                    validateUser: mockedAuthService
                } as any
            }
            authService: AuthService
            validate = local.validate
        }
        const module = await Test.createTestingModule({
            imports: [
                PassportModule,
                JwtModule.register({
                    secretOrPrivateKey: 'secret',
                    signOptions: {},
                }),
            ],
            providers: [
                {
                    provide: LocalStrategy,
                    useValue: new MockLocalStrategy()
                },
                {
                    provide: AuthService,
                    useValue: {
                        validateUser: mockedAuthService
                    }
                }
            ],
        }).compile();

        localStrategy = await module.get(LocalStrategy);
    })

    it('should return user', async () => {
        mockedAuthService.mockReturnValue(user);
        const fetched = await localStrategy.validate(user.email as never, user.password);
        expect(fetched).toEqual(user);
    })

    it('should return user', async () => {
        mockedAuthService.mockReturnValue(null);
        expect(() => localStrategy.validate('email' as never, 'pwdd')).toThrow
    })
})