import { createMock } from '@golevelup/ts-jest';
import { KafkaPublisherHandler } from './kafka-publisher.handler';
import { EventDispatcherFactory } from './event-dispatcher.factory';
import { EventDispatcher, EventName } from 'arithmetic-packages';
import { OperationCalculatedEvent } from '../../domain/calculator/event/operation-calculated.event';

describe('EventDispatcherFactory', () => {
  let factory: EventDispatcherFactory;
  let kafkaPublisherHandler: KafkaPublisherHandler;

  beforeEach(() => {
    kafkaPublisherHandler = createMock<KafkaPublisherHandler>();
    factory = new EventDispatcherFactory(kafkaPublisherHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(factory).toBeDefined();
  });

  it('must create an instance of EventDispatcherInterface', () => {
    const eventDispatcher = factory.create();
    expect(eventDispatcher).toBeDefined();
    expect(eventDispatcher).toBeInstanceOf(EventDispatcher);

    const handlerSpy = jest.spyOn(kafkaPublisherHandler, 'handle');

    const hasOperationCalculated = eventDispatcher.has(
      EventName.OPERATION_CALCULATED,
      kafkaPublisherHandler,
    );
    expect(hasOperationCalculated).toBeTruthy();

    eventDispatcher.dispatch(
      new OperationCalculatedEvent({
        eventName: EventName.OPERATION_CALCULATED,
        data: {
          userId: 1,
          operationType: 'addition',
          arguments: [1, 2],
          result: '3',
        },
      }),
    );
    expect(handlerSpy).toHaveBeenCalledTimes(1);
  });
});
