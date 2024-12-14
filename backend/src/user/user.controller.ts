import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() { name, email, phone, password }: { name: string; email: string; phone: string; password: string },
  ) {
    return this.userService.createUser(name, email, phone, password);
  }

  // Subruta: /users/list
  @Get('list')
  async getUsersList() {
    return this.userService.list();
  }


}
