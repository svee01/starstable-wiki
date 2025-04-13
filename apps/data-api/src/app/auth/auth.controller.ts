import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './jwt-auth.guard';
import { InjectToken, Token } from './token.decorator';
import { LoginDto } from './login.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
        async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.email, loginDto.pass);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@InjectToken() token: Token){
        return this.authService.profile(token.sub)
    }
}
