import { Module } from '@nestjs/common';
import { ProducerService } from './services/producer.service';
import { ConsumerService } from './services/consumer.service';
import { TestConsumer } from './services/test.consumer';
import { MailsService } from 'src/mails/mails.service';

@Module({
  providers: [ProducerService, ConsumerService, TestConsumer, MailsService],
  controllers: [],
  exports: [ProducerService, TestConsumer, ConsumerService],
  imports: [],
})
export class KafkaModule {}
