export class DefaultError extends Error {
  private statusCode: number;

  constructor(data: { message: string; statusCode: number }) {
    super(data.message);
    this.statusCode = data.statusCode || 500;
    this.name = DefaultError.name;
    Object.setPrototypeOf(this, DefaultError.prototype);
  }

  public getStatusCode(): number {
    return this.statusCode;
  }
}
