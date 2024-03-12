import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
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
      mechanism: 'scram-sha-256',
      username: 'espublish',
      password: 'KUSrnlB7x8G00wEDLpTnKMC3f1hUQdij',
    },
  });

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    //console.log('----------------Producer------------------', record.messages);
    this.producer.send(record);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
