import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './interfaces/User';
import { ConsumerService } from './kafka/services/consumer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private consumerService: ConsumerService,
  ) {}

  @Get()
  getHello(): string {
    return `Hola mundo`;
  }

  @Post('sendemail')
  createUser(@Body() user: User) {
    this.consumerService.consume(
      { topics: ['test'] },
      {
        eachMessage: async ({ message }) => {
          console.log({
            value: message.value,
            /* topic: topic.toString(),
            partition: partition.toString(), */
          });
        },
      },
    );
    return this.appService.createUser(user);
  }
  //return this.appService.createUser(user);
}
