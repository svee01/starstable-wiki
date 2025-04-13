import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto as User } from './schemas/user.dto';
import { UserService } from './user.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { InjectToken, Token } from '../auth/token.decorator';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'List of users' })
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'User by id' })
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Get('username/:username')
  @ApiResponse({ status: 200, description: 'User by username' })
  getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Get('character')
  @UseGuards(AuthGuard)
  getCharacter(@InjectToken() token: Token) {
    return this.userService.getCharacterByUserId(token.sub);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'User created successfully' })
  addUser(@Body() user: User) {
    return this.userService.addUser(user);
  }

  @Put()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  updateUser(@Body() user: User, @InjectToken() token: Token) {
    return this.userService.updateUser(user, token.sub);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  deleteUser(@Param('id') id: string, @InjectToken() token: Token) {
    return this.userService.deleteUser(id, token.sub);
  }
}
