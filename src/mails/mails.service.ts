import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConsumerService } from 'src/kafka/services/consumer.service';

@Injectable()
export class MailsService {
  constructor(
    private mailerService: MailerService,
    private consumerService: ConsumerService,
  ) {}

  async senMessage(user: string, email: string) {
    const message = 'Prueba';
    await this.mailerService.sendMail({
      to: email,
      subject: `Probando aplicacion`,
      template: './welcome',
      context: {
        name: user,
        message: message,
      },
    });
  }
}
