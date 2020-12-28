import { Test } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create.user.dto';

const mockFindOne = jest.fn();
const mockExecute = jest.fn();
 
describe('The CatRepository', () => {

    let userRepository: UserRepository;

    beforeEach(async () => {
        const user = new UserRepository();
        class MockUserRepository {
            createQueryBuilder = () =>{
                return { 
                    insert: () => {
                        return {
                            into: () => {
                                return {
                                    values: () => {
                                        return {
                                            execute: mockExecute
                                        }
                                    }

                                }
                            },
                        }
                    }
                }
            }
            findOne = mockFindOne
            createUser = user.createUser
        }
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getCustomRepositoryToken(UserRepository),
                    useValue: new MockUserRepository()
                }
            ],
        }).compile();

        userRepository = await module.get(UserRepository);
    })

    it('createUser', async () => {
        mockExecute.mockReturnValue(undefined);
        const user = {
            id: 'id',
            email: 'email@email.fr'
        } as CreateUserDto;
        mockFindOne.mockReturnValue(user);
        const fetched = await userRepository.createUser(user);
        expect(fetched).toEqual(user); 
    })
})