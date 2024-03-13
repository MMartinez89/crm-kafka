import { Injectable } from '@nestjs/common';
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics } from 'kafkajs';
import { kafkaConnect } from 'src/utils/kafka-connect';

@Injectable()
export class ConsumerService {
  /*  private readonly kafka = new Kafka({
    //brokers: ['localhost:9092'],
    clientId: 'my-app',
    brokers: [
      'development-kafka-bootstrap-demoea.apps.65ed21c50dfb940011a879d0.cloud.techzone.ibm.com:443',
    ],
    ssl: {
      rejectUnauthorized: true,
      ca: [readFileSync('./es-cert.pem')],
    },
    sasl: {
      mechanism: 'scram-sha-512',
      username: 'espublish',
      password: 'KUSrnlB7x8G00wEDLpTnKMC3f1hUQdij',
    },
  }); */

  private kafka = kafkaConnect();

  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({
      groupId: 'manuel',
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
