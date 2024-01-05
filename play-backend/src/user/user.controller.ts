import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('save')
  async saveUser(@Body() user: UserDto) {
    return await this.userService.saveUser(user);
  }

  @Get('list')
  async listUser() {
    return await this.userService.getUserList();
  }
}
