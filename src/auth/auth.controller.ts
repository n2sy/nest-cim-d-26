import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
    constructor(private authSer: AuthService) { }

    @Post("signup")
    async inscription(@Body() corps) {
        let result = await this.authSer.signup(corps);
        return { message: "User Created", result }
    }
}
