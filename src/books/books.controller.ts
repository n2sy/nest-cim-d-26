import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service.js';

@Controller('books')
export class BooksController {

    @Inject(BooksService) bookService: BooksService

    @Post('add')
    async ajouterLivre(@Body() body: any) {
        let res = await this.bookService.addBook(body)
        return { message: "Book Added", result: res }

    }

    @Get('all')
    async chercherTousLesLivres() {
        let res = await this.bookService.getAllBooks();
        return res;
    }
    @Get('all/:bookId')
    async chercherUnLivres(@Param('bookId') bookId) {
        let res = await this.bookService.getBookById(bookId);
        return res;
    }

    @Put("edit/:bookId")
    async mettreAjourLivre(@Param('bookId', ParseIntPipe) bookId, @Body() uBook: any) {

        let res = await this.bookService.updateBook(bookId, uBook)
        return { message: "Book updated", result: res }
    }

    @Delete("delete/:bookId")
    async supprimerLivre(@Param('bookId') bookId) {
        let r = await this.bookService.softDeleteBook(bookId);
        return { message: "Book Deleted", result: r }
    }
    @Delete("remove/:bookId")
    async supprimerLivreV2(@Param('bookId') bookId) {
        let r = await this.bookService.softRemoveBook(bookId);
        return { message: "Book Removed", result: r }
    }
    @Patch("restore/:bookId")
    async restorerLivre(@Param('bookId') bookId) {
        let r = await this.bookService.restoreBook(bookId);
        return { message: "Book rerstored", result: r }
    }
    @Patch("recover/:bookId")
    async restorerLivreV2(@Param('bookId') bookId) {
        let r = await this.bookService.recoverBook(bookId);
        return { message: "Book recovered", result: r }
    }




}
