import { Module } from '@nestjs/common';
import { ProducerService } from './services/producer.service';
import { ConsumerService } from './services/consumer.service';
import { TestConsumer } from './services/test.consumer';

@Module({
  providers: [ProducerService, ConsumerService, TestConsumer],
  controllers: [],
  exports: [ProducerService, TestConsumer, ConsumerService],
  imports: [],
})
export class KafkaModule {}
