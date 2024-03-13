import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Producer, ProducerRecord } from 'kafkajs';
import { kafkaConnect } from 'src/utils/kafka-connect';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
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
