import { createMock } from '@golevelup/ts-jest';
import { KafkaPublisherHandler } from './kafka-publisher.handler';
import { KafkaClient } from './kafka-client.interface';
import { OperationCalculatedEvent } from '../../domain/calculator/event/operation-calculated.event';
import { EventName } from 'arithmetic-packages';

describe('Kafka Publisher Handler', () => {
  let handler: KafkaPublisherHandler;
  let kafkaClient: KafkaClient;

  beforeEach(() => {
    kafkaClient = createMock<KafkaClient>();
    handler = new KafkaPublisherHandler(kafkaClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('must publish a message to a topic', async () => {
    const event = new OperationCalculatedEvent({
      eventName: EventName.OPERATION_CALCULATED,
      data: {
        userId: 1,
        operationType: 'addition',
        arguments: [1, 2],
        result: '3',
      },
    });

    const publishSpy = jest.spyOn(kafkaClient, 'publish');

    await handler.handle(event);
    expect(publishSpy).toHaveBeenCalledTimes(1);
    expect(publishSpy).toHaveBeenCalledWith(
      EventName.OPERATION_CALCULATED,
      JSON.stringify(event.payload),
    );
  });
});
