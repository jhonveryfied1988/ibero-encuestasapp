import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body() { name, email, phone, password }: { name: string; email: string; phone: string; password: string },
  ) {
    return this.userService.createUser(name, email, phone, password);
  }
}
