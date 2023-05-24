export class User {

  constructor(
    private id: number,
    private email: string,
    private statusId: number,
    private currentBalance: number,
  ) {}

  public getId(): number {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getStatusId(): number {
    return this.statusId;
  }

  public getCurrentBalance(): number {
    return this.currentBalance;
  }

  public spendMoney(amount: number): void {
    if (amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    if (amount > this.currentBalance) {
      throw new Error('User balance is not enough');
    }
    this.currentBalance -= amount;
  }

}
