import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './interfaces/User';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return `Hola mundo`;
  }

  @Post('sendemail')
  createUser(@Body() user: User) {
    return this.appService.createUser(user);
  }
}
