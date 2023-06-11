import { EventInterface, EventName } from 'arithmetic-packages';

export interface OperationCalculatedEventProps {
  eventName: EventName;
  data: {
    userId: number;
    operationType: string;
    arguments: number[] | string[];
    result: string;
  };
}

export class OperationCalculatedEvent
  implements EventInterface<OperationCalculatedEventProps>
{
  constructor(private readonly payload: OperationCalculatedEventProps) {}

  getName(): string {
    return EventName.OPERATION_CALCULATED;
  }

  getPayload(): OperationCalculatedEventProps {
    return this.payload;
  }

  getDateTime(): Date {
    return new Date();
  }
}
