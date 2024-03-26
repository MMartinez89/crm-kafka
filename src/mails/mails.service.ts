import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConsumerService } from 'src/kafka/services/consumer.service';
import { User } from 'src/interfaces/User';

@Injectable()
export class MailsService {
  constructor(
    private mailerService: MailerService,
    private consumerService: ConsumerService,
  ) {}

  async senMessage(
    user: User,
    /* name: string,
    lastname: string,
    email: string,
    date: string,
    city: string,
    model: string,
    modality: string, */
  ) {
    //const message = 'Prueba';
    const { name, lastname, email, date, city, model, modality } = user;
    const hora = new Date(date).toLocaleTimeString();
    await this.mailerService.sendMail({
      to: 'manuelmartinezc7@gmail.com',
      subject: `Posible venta`,
      template: './welcome',
      context: {
        name: name,
        lastname: lastname,
        email: email,
        date: new Date(date).toLocaleDateString(),
        hora: hora,
        city: city,
        model: model,
        modality: modality,
      },
    });
  }
}
