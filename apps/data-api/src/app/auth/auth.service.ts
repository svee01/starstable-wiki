import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(email: string, pass: string): Promise<any> {
    console.log('Password entered:', pass);
    console.log('Password saved in database:', pass);
    if (!email || !pass) {
      throw new BadRequestException('Email and password must be provided');
    }
  
    const userResult = await this.userService.getUserByUsername(email);
    const user = userResult;

    console.log('User found:', user);
  
    if (!user) {
      throw new BadRequestException('Invalid credentials (user not found)');
    }
  
    if (!user.password) {
      throw new BadRequestException('Invalid credentials (no password found)');
    }
  
    const isMatch = await bcrypt.compare(pass, user.password);
  
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials (wrong password)');
    }
  
    const payload = { sub: user._id, email: user.email };
  
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user
    };
  }  

  async profile(sub: string) {
    return await this.userService.getUserById(sub);
  }
}
