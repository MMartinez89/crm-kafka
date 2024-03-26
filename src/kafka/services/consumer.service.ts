import { Injectable } from '@nestjs/common';
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics } from 'kafkajs';
import { kafkaConnect } from 'src/utils/kafka-connect';

@Injectable()
export class ConsumerService {
  private kafka = kafkaConnect();

  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({
      groupId: 'manuel',
    });

    await consumer.connect();

    await consumer.subscribe(topic);
    await consumer.run(config);
    /* await consumer.run({
      autoCommit: false,
      eachMessage: async ({ message }) => {
        console.log('offset: ' + message.offset);
        const obj = JSON.parse(message.value);
        console.log(obj);
        console.log(obj.email);
        if (obj.model == 'Ford Ranger') {
          throw new Error('modelo prohibido' + obj.model);
        }
      },
    }); */

    this.consumers.push(consumer);
  }

  async OnApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
