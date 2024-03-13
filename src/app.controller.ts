import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './interfaces/User';
import { ConsumerService } from './kafka/services/consumer.service';
import { ProducerService } from './kafka/services/producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private consumerService: ConsumerService,
    private producerService: ProducerService,
  ) {}

  @Get()
  getHello(): string {
    return `Hola mundo`;
  }

  @Post('sendemail')
  createUser(@Body() user: User) {
    const message = JSON.stringify(user);
    this.producerService.produce({
      topic: 'salida',
      messages: [{ key: 'key1', value: message }],
    });

    return this.appService.createUser(user);

    /*  this.consumerService.consume(
      { topics: ['salida'] },
      {
        eachMessage: async ({ message, topic, partition }) => {
          console.log(`----------`, {
            value: message.value,
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
    return this.appService.createUser(user);
  } */
    //return this.appService.createUser(user);
  }
}
