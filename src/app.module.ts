import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './kafka/services/test.consumer';
import { MailsModule } from './mails/mails.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    KafkaModule,
    MailsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
