import { EventHandlerInterface } from 'arithmetic-packages';
import { OperationCalculatedEvent } from '../../../domain/calculator/event/operation-calculated.event';

export class OperationCalculatedKafkaHandler implements EventHandlerInterface {
  handle(event: OperationCalculatedEvent): void {
    console.log(`Publishing event on kafka`, event);
  }
}
