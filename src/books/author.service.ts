import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './Entities/author.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
    constructor(@InjectRepository(AuthorEntity) private authorRepo: Repository<AuthorEntity>) {

    }

    async getAllAuthors() {
        let res = await this.authorRepo.find()
        return res

    }

    async getAuthorById(id) {
        let res = await this.authorRepo.findOne({ where: { id: id } })
        return res



    }

    async addAuthor(newAuthor) {
        let res = await this.authorRepo.save(newAuthor)
        return res

    }


}
