import { Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

describe('The JwtStrategy', () => {

    interface NewJwtStrategy {
        validate: (mocked: object) => object,
    }

    let jwtStrategy: JwtStrategy | NewJwtStrategy;

    const payload: object = {
        id: 'id',
        email: 'email@tt.fr'
    }

    beforeEach(async () => {
        const secret = 'secretKey';
        const jwt = new JwtStrategy(jest.fn(), secret);
        class MockJwtStrategy {
            validate = jwt.validate
        }
        const module = await Test.createTestingModule({
            imports: [
                PassportModule,
                JwtModule.register({
                    secretOrPrivateKey: secret,
                    signOptions: {},
                }),
            ],
            providers: [
                {
                    provide: JwtStrategy,
                    useValue: new MockJwtStrategy()
                }
            ],
        }).compile();

        jwtStrategy = await module.get(JwtStrategy);
    })

    it('should return payload', async () => {
        const fetched = await jwtStrategy.validate(payload);
        expect(fetched).toEqual(payload);
    })
})