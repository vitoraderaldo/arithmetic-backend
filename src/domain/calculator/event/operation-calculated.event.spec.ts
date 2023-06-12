import { EventName } from 'arithmetic-packages';
import { OperationCalculatedEvent } from './operation-calculated.event';

describe('OperationCalculatedEvent', () => {
  it('must create the event', () => {
    const message = {
      eventName: EventName.OPERATION_CALCULATED,
      data: {
        userId: 1,
        operationType: 'addition',
        arguments: [1, 2],
        result: '3',
      },
    };

    const event = new OperationCalculatedEvent(message);

    expect(event).toBeDefined();
    expect(event.name).toBe(EventName.OPERATION_CALCULATED);
    expect(event.payload).toEqual(message);
    expect(event.dateTime).toBeDefined();
  });
});
