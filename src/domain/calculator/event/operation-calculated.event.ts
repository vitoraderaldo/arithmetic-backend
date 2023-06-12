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
  public readonly name = EventName.OPERATION_CALCULATED;
  public readonly dateTime = new Date();

  constructor(public readonly payload: OperationCalculatedEventProps) {}
}
