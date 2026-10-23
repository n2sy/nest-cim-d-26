import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthorService } from './author.service.js';

@Controller('author')
export class AuthorController {
    constructor(private authSer: AuthorService) {

    }

    @Get('all')
    async chercherTousLesAuteurs() {
        let result = await this.authSer.getAllAuthors()
        return { result }
    }

    @Get('all/:id')
    async chercherUnAuteur(@Param("id") id) {
        let result = await this.authSer.getAuthorById(id)
        return { message: "Author found", result }

    }

    @Post("new")
    async ajouterAuteur(@Body() corps) {
        let result = await this.authSer.addAuthor(corps)
        return { message: "Author created", result }
    }
}
