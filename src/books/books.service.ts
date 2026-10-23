import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './Entities/book.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(@InjectRepository(BookEntity) private bookRepo: Repository<BookEntity>) {

    }

    async getAllBooks() {
        let res = await this.bookRepo.find(
            {
                //  withDeleted: true
            }
        )
        return res
    }

    async getBookById(bookId) {
        let res = await this.bookRepo.findOne({ where: { id: bookId } });
        if (!res) throw new NotFoundException(`Le livre d'id ${bookId} n'existe pas`)

        return res
    }

    async updateBook(bookId, uBook) {
        let updatedBook = await this.bookRepo.preload(
            {
                id: bookId,
                ...uBook
            }
        );
        if (!updatedBook) throw new NotFoundException(`Le livre d'id ${bookId} ne peut pas être mis à jour`);
        const res = await this.bookRepo.save(updatedBook)

        return res


    }

    async addBook(newBook: any) {
        try {
            const res = await this.bookRepo.save(newBook)
            return res;
        }
        catch (e) {
            throw new InternalServerErrorException();
        }

    }

    async softDeleteBook(bookId) {
        let res = await this.bookRepo.softDelete({ id: bookId });

        return res
    }
    async softRemoveBook(bookId) {
        let selectedBook = await this.getBookById(bookId)
        let res = await this.bookRepo.softRemove(selectedBook);
        return res
    }

    async restoreBook(bookId) {
        let res = await this.bookRepo.restore({ id: bookId });
        return res
    }

    async recoverBook(bookId) {
        let res = await this.bookRepo.find({
            where: {
                id: bookId
            },
            withDeleted: true
        })
        let r = await this.bookRepo.recover(res[0])
        return r;
    }




}
