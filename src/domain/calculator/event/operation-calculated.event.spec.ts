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
    expect(event.getName()).toBe(EventName.OPERATION_CALCULATED);
    expect(event.getPayload()).toEqual(message);
    expect(event.getDateTime()).toBeDefined();
  });
});
