import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './jwt-auth.guard';
import { UserCredentials } from '@StardewConnect/libs/data';
import { InjectToken, Token } from './token.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() credentialsDto: UserCredentials){
        return this.authService.login(credentialsDto.username, credentialsDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@InjectToken() token: Token){
        return this.authService.profile(token.sub)
    }
}
