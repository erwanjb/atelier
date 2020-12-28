import { Test } from '@nestjs/testing';
import { Cat } from './cat.entity';
import { User } from '../user/user.entity';
import { CatService } from './cat.service';
import { CatController, BodyLike, ReqUser } from './cat.controller';

describe('The CatController', () => {
  let catController: CatController;
  let getCats: jest.Mock;
  let getCatById: jest.Mock;
  let getTwoCatsRandom: jest.Mock;
  let vote: jest.Mock;
  beforeEach(async () => {
    getCats = jest.fn();
    getCatById = jest.fn();
    getTwoCatsRandom = jest.fn();
    vote = jest.fn();
    const module = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        {
          provide: CatService,
          useValue: {
            getCats,
            getCatById,
            getTwoCatsRandom,
            vote
          }
        }
      ],
    })
      .compile();
    catController = await module.get(CatController);
  })

  describe('getCats', () => {
    let cats: Cat[];
    beforeEach(() => {
      cats = [new Cat()];
      getCats.mockReturnValue(Promise.resolve(cats));
    })
    it('should return the cat', async () => {
      const fetchedCat = await catController.getCats();
      expect(fetchedCat).toEqual(cats);
    })
  })

  describe('getCatById', () => {
    let cat: Cat;
    beforeEach(() => {
      cat = new Cat();
      getCatById.mockReturnValue(Promise.resolve(cat));
    })
    it('should return the cat', async () => {
      const fetchedCat = await catController.getCatById(cat.id);
      expect(fetchedCat).toEqual(cat);
    })
  })

  describe('getTwoCatsRandom', () => {
    let cats: Cat[];
    beforeEach(() => {
      cats = [new Cat(), new Cat()];
      getTwoCatsRandom.mockReturnValue(Promise.resolve(cats));
    })
    it('should return the cats', async () => {
      const fetchedCat = await catController.getTwoCatsRandom();
      expect(fetchedCat).toEqual(cats);
    })
  })

  describe('vote', () => {
    let body: BodyLike;
    let req: ReqUser;
    let callback: Function;
    let something: any = undefined;
    beforeEach(() => {
      body = { catId: 'haha' };
      req = { user: new User() } as ReqUser;
      callback = () => something;
      vote.mockReturnValue(Promise.resolve(callback()));
    })
    it('should return callback', async () => {
      const fetchedCat = await catController.vote(body, req);
      expect(fetchedCat).toEqual(something);
    })
  })
})