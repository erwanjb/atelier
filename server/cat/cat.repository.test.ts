import { Test } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { CatRepository } from './cat.repository';

const mockGetOne = jest.fn();
const mockExecute = jest.fn();

describe('The CatRepository', () => {

    interface NewCatRepository {
        findCats: (mocked: boolean) => Cat[],
        vote: (mocked: boolean) => object
    }

    let catRepository: CatRepository | NewCatRepository;
    const oneCat = {
        id: 'something',
        url: 'http://url'
    }
    const voteCat = {
        id: 'somethingVote',
        url: 'http://urlVote'
    }
    const manyCats = [
        {
            id: 'something',
            url: 'http://url'
        },
        {
            id: 'somethingBis',
            url: 'http://urlBis'
        },
        {
            id: 'somethingAgain',
            url: 'http://urlAgain'
        }
    ]

    beforeEach(async () => {
        const cat = new CatRepository();
        class MockCatRepository {
            createQueryBuilder = (shouldThrow: boolean | undefined | string) => {
                return {
                    insert: () => {
                        return {
                            into: () => {
                                return {
                                    values: () => {
                                        return {
                                            execute: shouldThrow === true ? () => { throw new Error() } : mockExecute
                                        }
                                    }

                                }
                            },
                        }
                    },
                    where: () => {
                        return {
                            getOne: mockGetOne,
                        }
                    },
                    leftJoinAndSelect: (id: string) => {
                        return {
                            where: (someString: string) => {
                                return {
                                    getOne: () => oneCat,
                                }
                            },
                            getMany: () => manyCats
                        }
                    }
                }
            }
            createCats = cat.createCats;
            findCatById = cat.findCatById;
            findCats = function (getNotMocked: boolean | undefined) {
                return !getNotMocked ? manyCats : cat.findCats.bind(this)();
            }
            findTwoCatsRandom = cat.findTwoCatsRandom;
            vote = function (shouldThrow: boolean) {
                if (shouldThrow) {
                    this.createQueryBuilder = this.createQueryBuilder.bind(null, true);
                    return cat.vote.bind(this)(voteCat.id, voteCat.url);
                }
                return cat.vote.bind(this)(voteCat.id, voteCat.url);
            }
        }
        const module = await Test.createTestingModule({
            providers: [
                {
                    provide: getCustomRepositoryToken(CatRepository),
                    useValue: new MockCatRepository()
                }
            ],
        }).compile();

        catRepository = await module.get(CatRepository);
    })

    it('should create the cats', async () => {
        const cats = [new Cat()];
        const catRe = catRepository as CatRepository;
        await catRe.createCats(cats);
        expect(mockExecute).toBeCalledTimes(cats.length);
        expect(mockGetOne).toBeCalledTimes(cats.length);
    })

    it('should return the cat', async () => {
        const catRe = catRepository as CatRepository;
        const getCat = await catRe.findCatById(oneCat.id);
        expect(getCat).toBe(oneCat);
    })

    it('should return many cats', async () => {
        const catRe = catRepository as NewCatRepository;
        const getCats = await catRe.findCats(true);
        expect(getCats).toBe(manyCats);
    })

    it('should return random cats', async () => {
        const catRe = catRepository as CatRepository;
        const getCats = await catRe.findTwoCatsRandom();
        for (const cat of getCats) {
            expect(manyCats).toContain(cat);
        }
    })

    it('should vote for a cat', async () => {
        const catRe = catRepository as NewCatRepository;
        const getVote = await catRe.vote(false);
        expect(getVote).toStrictEqual({ status: 'OK' });
    })

    it('should vote for a cat and catch an error', async () => {
        const catRe = catRepository as NewCatRepository;
        const getVote = await catRe.vote(true);
        expect(getVote).toStrictEqual({ status: 'NO' });
    })

})