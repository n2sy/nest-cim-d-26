import { Module } from '@nestjs/common';
import { BooksController } from './books.controller.js';
import { BooksService } from './books.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './Entities/book.entity.js';
import { AuthorEntity } from './Entities/author.entity.js';
import { AuthorService } from './author.service.js';
import { AuthorController } from './author.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
    controllers: [BooksController, AuthorController],
    providers: [BooksService, AuthorService],
})
export class BooksModule { }
