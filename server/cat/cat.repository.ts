import {
    Repository,
    EntityRepository,
    //InsertResult,
    //UpdateResult,
} from "typeorm";
import { Cat } from "./cat.entity";
import { CreateCatDto } from './dto/create.cat.dto';

@EntityRepository(Cat)
export class CatRepository extends Repository<Cat> {
    async createCats(cats: CreateCatDto[]) {
        cats.map(async (cat) => {
            const found = await this.createQueryBuilder('cat')
                .where("(cat.id = :id OR cat.url = :url)", { id: cat.id, url: cat.url })
                .getOne();
            if (!found) {
                await this.createQueryBuilder()
                    .insert()
                    .into(Cat)
                    .values(cat)
                    .execute();
            }
        })
    }

    async findCatById (id: string) {
        const query = this.createQueryBuilder('cat')
        .where("cat.id = :id", { id })
        const cat = await query.getOne();
        return cat;
    }

    async findCats () {
        const query = this.createQueryBuilder('cat')
        const cats = await query.getMany();
        return cats;
    }

    async findTwoCatsRandom() {
        const cats = await this.findCats();
        const cat1 = cats[Math.floor(Math.random() * cats.length)];
        let cat2;
        do {
            cat2 = cats[Math.floor(Math.random() * cats.length)];
        } while (cat1.id === cat2.id);
        return [cat1, cat2 as Cat];
    }
}