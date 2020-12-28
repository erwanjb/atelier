import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';

describe('The CatService', () => {
  let catService: CatService;
  let findCats: jest.Mock;
  let findCatById: jest.Mock;
  let findTwoCatsRandom: jest.Mock;
  let vote: jest.Mock;
  let axios: any;
  let createCats: jest.Mock;
  const cats: Cat[] = [new Cat()];
  beforeEach(async () => {
    findCats = jest.fn();
    findCatById = jest.fn();
    findTwoCatsRandom = jest.fn();
    createCats = jest.fn();
    axios = () => {
      return {
        data: (() => {
          return {
            images: cats
          }
        })
      }
    }
    vote = jest.fn();
    const module = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: getRepositoryToken(Cat),
          useValue: {
            findCats,
            findCatById,
            findTwoCatsRandom,
            vote,
            createCats
          }
        }
      ],
    })
      .compile();
    catService = await module.get(CatService);
  })

  describe('insertCats', () => {
    const mockCreateCats: any = undefined;
    beforeEach(() => {
      createCats.mockReturnValue(Promise.resolve(mockCreateCats));
    })
    it('should return the cats', async () => {
      const fetchedCat = await catService.insertCats();
      expect(fetchedCat).toEqual(mockCreateCats);
    })
  })

  describe('getCats', () => {
    let cats: Cat[];
    beforeEach(() => {
      cats = [new Cat()];
      findCats.mockReturnValue(Promise.resolve(cats));
    })
    it('should return the cats', async () => {
      const fetchedCat = await catService.getCats();
      expect(fetchedCat).toEqual(cats);
    })
  })

  describe('getCatById', () => {
    let cat: Cat;
    beforeEach(() => {
      cat = new Cat();
      findCatById.mockReturnValue(Promise.resolve(cat));
    })
    it('should return the cat', async () => {
      const fetchedCat = await catService.getCatById(cat.id);
      expect(fetchedCat).toEqual(cat);
    })
  })

  describe('getTwoCatsRandom', () => {
    let cats: Cat[];
    beforeEach(() => {
      cats = [new Cat(), new Cat()];
      findTwoCatsRandom.mockReturnValue(Promise.resolve(cats));
    })
    it('should return the cats', async () => {
      const fetchedCat = await catService.getTwoCatsRandom();
      expect(fetchedCat).toEqual(cats);
    })
  })

  describe('vote', () => {
    let callback: Function;
    let something: any = undefined;
    let catId: string;
    let userId: string;
    beforeEach(() => {
      catId = 'haha';
      userId = 'hihi';
      callback = () => something;
      vote.mockReturnValue(Promise.resolve(callback()));
    })
    it('should return callback', async () => {
      const fetchedCat = await catService.vote(catId, userId);
      expect(fetchedCat).toEqual(something);
    })
  })
});