import { readFileSync } from 'fs';
import { Kafka } from 'kafkajs';

export function kafkaConnect() {
  const kafka = new Kafka({
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
  });
  return kafka;
}
