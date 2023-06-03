export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps): void {
    this.errors.push(error);
  }

  messages(context: string): string {
    const messages = this.errors
      .filter((error) => error.context === context)
      .map((error) => error.message);
    return `${messages.join(', ')}`;
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}
