import {
  EventDispatcher,
  EventDispatcherInterface,
  EventName,
} from 'arithmetic-packages';
import { KafkaPublisherHandler } from './kafka-publisher.handler';

export class EventDispatcherFactory {
  constructor(private readonly kafkaPublisherHandler: KafkaPublisherHandler) {}

  create(): EventDispatcherInterface {
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.register(
      EventName.OPERATION_CALCULATED,
      this.kafkaPublisherHandler,
    );
    return eventDispatcher;
  }
}
