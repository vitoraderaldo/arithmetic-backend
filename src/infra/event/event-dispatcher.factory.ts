import {
  EventDispatcher,
  EventDispatcherInterface,
  EventName,
} from 'arithmetic-packages';
import { OperationCalculatedKafkaHandler } from '../calculator/event/operation-calculated.kafka.handler';

export class EventDispatcherFactory {
  static create(): EventDispatcherInterface {
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.register(
      EventName.OPERATION_CALCULATED,
      new OperationCalculatedKafkaHandler(),
    );
    return eventDispatcher;
  }
}
