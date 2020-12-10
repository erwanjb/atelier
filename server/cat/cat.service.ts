import { Injectable } from '@nestjs/common';
import { CatRepository } from "./cat.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCatDto } from './dto/create.cat.dto';
import axios from 'axios';

@Injectable()
export class CatService {
    constructor(
        @InjectRepository(CatRepository)
        private catRepository: CatRepository
    ) {}

    async insertCats () {
        const query = await axios.get('https://latelier.co/data/cats.json');
        const cats = query.data.images as CreateCatDto[];
        this.catRepository.createCats(cats);
    }

    async getCats() {
        return this.catRepository.findCats();
    }

    async getCatById(id: string) {
        return this.catRepository.findCatById(id);
    }
}