import { Kafka, KafkaConfig, logLevel as KafkaLogLevel } from 'kafkajs';
import { KafkaClient } from './kafka-client.interface';
import { KafkaLogAdapter } from '../logger/adapters/kafka-logger-adapter';

export class KafkaJSClient implements KafkaClient {
  private kafka: Kafka;

  constructor(
    private readonly clientId: string,
    private readonly brokers: string[],
    private credentials: {
      username: string;
      password: string;
    },
  ) {
    const config: KafkaConfig = {
      clientId: this.clientId,
      brokers: this.brokers,
      logLevel: KafkaLogLevel.ERROR,
      logCreator: KafkaLogAdapter,
    };
    if (this.credentials.username) {
      config.ssl = true;
      config.sasl = {
        mechanism: 'plain',
        username: this.credentials.username,
        password: this.credentials.password,
      };
    }
    this.kafka = new Kafka(config);
  }

  async publish(topic: string, message: string): Promise<void> {
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }],
    });
  }
}
