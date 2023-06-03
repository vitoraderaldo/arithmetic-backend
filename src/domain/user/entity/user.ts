import { Entity } from '../../../@shared/entity/entity.abstract';
import { InvalidDataError } from '../../../@shared/error/invalid-data.error';
import { BalanceError } from '../error/balance.error';
import { UserValidatorFactory } from '../validator/user-validator.factory';

export class User extends Entity {
  constructor(
    private id: number,
    private email: string,
    private statusId: number,
    private currentBalance: number,
  ) {
    super();
    const isValid = UserValidatorFactory.create().isValid(this);
    if (!isValid) {
      throw new InvalidDataError(this.notification.messages('user'));
    }
  }

  public getId(): number {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getStatusId(): number {
    return this.statusId;
  }

  public isActive(): boolean {
    return this.statusId === 1;
  }

  public getCurrentBalance(): number {
    return this.currentBalance;
  }

  public spendMoney(amount: number): void {
    if (amount <= 0) {
      this.notification.addError({
        message: 'Amount must be greater than 0',
        context: 'user',
      });
    }
    if (amount > this.currentBalance) {
      this.notification.addError({
        message: `Your balance is not enough to spend $ ${amount}`,
        context: 'user',
      });
    }
    if (this.notification.hasErrors()) {
      throw new BalanceError(this.notification.messages('user'));
    }
    this.currentBalance -= amount;
  }
}
