import { Notification } from '../notification/notification';

export abstract class Entity {
  readonly notification: Notification;

  constructor() {
    this.notification = new Notification();
  }
}
