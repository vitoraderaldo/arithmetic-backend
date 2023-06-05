import { EventHandlerInterface, EventInterface } from 'arithmetic-packages';
import { KafkaClient } from './kafka-client.interface';

export class KafkaPublisherHandler implements EventHandlerInterface {
  constructor(private readonly fafkaClient: KafkaClient) {}

  async handle(event: EventInterface<any>): Promise<void> {
    const message = JSON.stringify(event.getPayload());
    const topic = event.getName();
    await this.fafkaClient.publish(topic, message);
  }
}
