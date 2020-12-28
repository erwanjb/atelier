import { Test } from '@nestjs/testing';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController, UserToCreate } from './user.controller';

jest.mock("nodemailer");
jest.mock("nodemailer-mailgun-transport");

describe('The CatController', () => {
    let userController: UserController;
    let create: jest.Mock;
    beforeEach(async () => {
        create = jest.fn();
        const module = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: {
                        create
                    }
                }
            ],
        })
            .compile();
        userController = await module.get(UserController);
    })

    describe('create', () => {
        let user: User;
        const response: any = undefined;
        beforeEach(() => {
            user = new User();
            create.mockReturnValue(Promise.resolve(response));
        })
        it('should return the response', async () => {
            const fetchedCat = await userController.create(user as UserToCreate);
            expect(fetchedCat).toEqual(response);
        })
    })
})