export interface KafkaClient {
  publish(topic: string, event: string): Promise<void>;
}
