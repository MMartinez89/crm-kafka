import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/services/producer.service';
import { User } from './interfaces/User';
import { MailsService } from './mails/mails.service';

@Injectable()
export class AppService {
  constructor(
    private producerService: ProducerService,
    private mailsService: MailsService,
  ) {}

  async createUser(user: User) {
    try {
      console.log('user created');
      await this.mailsService.senMessage(user.name, user.email);
      return { message: 'email sended' };
    } catch (error) {
      console.log('---------------', error.message);
      throw new ErrorEvent(error.message);
    }
  }

  async getHello() {
    await this.producerService.produce({
      topic: 'salida',
      messages: [
        {
          value: 'Hello world',
        },
      ],
    });

    return 'Hello world';
  }
}
