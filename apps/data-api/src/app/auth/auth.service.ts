import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {}

    async login(username: string, pass: string): Promise<any> {
        const user = (await this.userService.getUserByUsername(username)).results;
        if(!user) {
            throw new BadRequestException('Invalid credentials')
        }
        
        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new BadRequestException('Invalid credentials');
        }   
        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            user: user
        };
    }

    async profile(sub: string) {
        return await this.userService.getUserById(sub);
    }
}
