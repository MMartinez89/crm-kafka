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
    let user: User;
    await this.consumerService.consume(
      { topics: ['salida'] },
      /*  {
        eachMessage: async ({ partition, topic, message }) => {
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });
         // user = JSON.parse(message.value.toString());
        },
      }, */
      {
        eachMessage: async ({ message }) => {
          console.log({
            value: message,
          });
          user = JSON.parse(message.value.toString());
          console.log(user.name);
          console.log(user.lastname);
          console.log(user.email);
          console.log(user.modality);
          console.log(user.model);
          console.log(user.date);
          return this.mailService.senMessage(user);
        },
      },
    );
  }
}
