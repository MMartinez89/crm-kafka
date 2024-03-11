import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';
import { readFileSync } from 'fs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
    /* brokers: [
      'development-kafka-bootstrap-demoea.apps.65da6fa0945cf30011ec51ed.cloud.techzone.ibm.com:443',
    ],
    ssl: {
      ca: [readFileSync('./es-cert.pem')],
      rejectUnauthorized: false,
    },

    sasl: {
      mechanism: 'scram-sha-256',
      username: 'espublish',
      password: 'IEsN07MHF0moGuiSPlwQtkliaxbMdrYH',
    }, */
  });

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    console.log('Producer', record.messages);
    this.producer.send(record);
  }

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
}
