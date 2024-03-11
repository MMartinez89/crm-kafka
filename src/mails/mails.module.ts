import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  exports: [MailsService],
  imports: [
    KafkaModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        //transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `No reply ${config.get('MAIL_FROM')}`,
        },
        template: {
          dir: join(__dirname, 'template'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [MailsService],
})
export class MailsModule {}
