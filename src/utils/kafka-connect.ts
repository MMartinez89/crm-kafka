import { readFileSync } from 'fs';
import { Kafka } from 'kafkajs';

export function kafkaConnect() {
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENTID,
    brokers: [process.env.KAFKA_BROKER],
    ssl: {
      rejectUnauthorized: true,
      ca: [readFileSync('./es-cert.pem')],
    },
    sasl: {
      mechanism: 'scram-sha-512',
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
    },
  });
  return kafka;
}
