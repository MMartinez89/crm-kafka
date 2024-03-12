import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
} from 'kafkajs';

@Injectable()
export class ConsumerService {
  private readonly kafka = new Kafka({
    //brokers: ['localhost:9092'],
    brokers: [
      'development-kafka-bootstrap-demoea.apps.65ed21c50dfb940011a879d0.cloud.techzone.ibm.com:443',
    ],
    ssl: {
      ca: [readFileSync('./es-cert.pem')],
      rejectUnauthorized: true,
    },
    sasl: {
      mechanism: 'scram-sha-512',
      username: 'espublish',
      password: 'KUSrnlB7x8G00wEDLpTnKMC3f1hUQdij',
    },
  });
  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({
      groupId: 'kafkajs',
    });

    await consumer.connect();

    await consumer.subscribe(topic);

    await consumer.run(config);

    this.consumers.push(consumer);
  }

  async OnApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
