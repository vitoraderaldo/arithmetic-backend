import { EventHandlerInterface, EventInterface } from 'arithmetic-packages';
import { KafkaClient } from './kafka-client.interface';

export class KafkaPublisherHandler implements EventHandlerInterface {
  constructor(private readonly fafkaClient: KafkaClient) {}

  async handle(event: EventInterface<any>): Promise<void> {
    const message = JSON.stringify(event.payload);
    const topic = event.name;
    await this.fafkaClient.publish(topic, message);
  }
}
