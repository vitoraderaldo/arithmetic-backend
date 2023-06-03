import { Notification } from './notification';

describe('Notification Test', () => {
  it('should create errors', () => {
    const notification = new Notification();
    const userError = {
      message: 'error message',
      context: 'user',
    };
    const userErro2 = {
      message: 'error message 2',
      context: 'user',
    };
    const recordError = {
      message: 'error message',
      context: 'record',
    };
    notification.addError(userError);
    notification.addError(userErro2);
    notification.addError(recordError);
    expect(notification.messages('user')).toBe(
      'error message, error message 2',
    );
  });

  it('should check if notification has at least one error', () => {
    const notification = new Notification();
    const userError = {
      message: 'error message',
      context: 'user',
    };
    notification.addError(userError);
    expect(notification.hasErrors()).toBe(true);
  });

  it('should check if notification has no errors', () => {
    const notification = new Notification();
    expect(notification.hasErrors()).toBe(false);
  });
});
