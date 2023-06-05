import { Kafka } from 'kafkajs';
import { KafkaClient } from './kafka-client.interface';
import { EnvironmentConfigInterface } from '../../@shared/environment/environment-config.interface';

export class KafkaJSClient implements KafkaClient {
  private kafka: Kafka;

  constructor(
    private readonly environmentConfigInterface: EnvironmentConfigInterface,
  ) {
    const kafkaConfig = this.environmentConfigInterface.getKafka();
    this.kafka = new Kafka({
      clientId: kafkaConfig.clientId,
      brokers: kafkaConfig.brokers,
    });
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
