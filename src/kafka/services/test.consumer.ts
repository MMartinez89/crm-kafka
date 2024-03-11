import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { User } from 'src/interfaces/User';
import { MailsService } from 'src/mails/mails.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private consumerService: ConsumerService,
    private mailService: MailsService,
  ) {}

  async onModuleInit() {
    let user;
    await this.consumerService.consume(
      { topics: ['test'] },
      /* {
        eachMessage: async ({ partition, topic, message }) => {
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
          user = JSON.parse(message.value.toString());
        },
      }, */
      {
        eachMessage: async ({ message }) => {
          user = JSON.parse(message.value.toString());
          return this.mailService.senMessage(user.name, user.email);
        },
      },
    );
    console.log(user);
    //return this.mailService.senMessage(user.name, user.email);
  }
}
