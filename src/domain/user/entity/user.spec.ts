import { InvalidDataError } from '../../../@shared/error/invalid-data.error';
import { BalanceError } from '../error/balance.error';
import { User } from './user';

type Props = {
  amount: number;
};

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User(1, 'email@email.com', 1, 100);
  });

  it('must get user data successfully', () => {
    expect(user.getId()).toEqual(1);
    expect(user.getEmail()).toEqual('email@email.com');
    expect(user.getStatusId()).toEqual(1);
    expect(user.getCurrentBalance()).toEqual(100);
    expect(user.isActive()).toEqual(true);
  });

  it('must spend money successfully', () => {
    user.spendMoney(30);
    const balance = user.getCurrentBalance();
    expect(balance).toEqual(70);
  });

  it.each`
    amount
    ${0}
    ${-1}
    ${-100}
  `('must not spend money if amount is less than 0', ({ amount }: Props) => {
    const spendMoney = () => user.spendMoney(amount);
    expect(spendMoney).toThrowError('Amount must be greater than 0');
    expect(spendMoney).toThrowError(BalanceError);
  });

  it.each`
    amount
    ${101}
    ${200}
    ${1000}
  `(
    'must not spend money if amount is greater than current balance',
    ({ amount }: Props) => {
      const spendMoney = () => user.spendMoney(amount);
      expect(spendMoney).toThrowError(
        `Your balance is not enough to spend $ ${amount}`,
      );
      expect(spendMoney).toThrowError(BalanceError);
    },
  );

  describe('Create user with invalid data', () => {
    it('must not create user if id is less than 0', () => {
      const createUser = () => new User(-1, 'email', 1, 100);
      expect(createUser).toThrowError(
        'id must be a positive number, email must be an email',
      );
      expect(createUser).toThrow(InvalidDataError);
    });

    it('must not create user with invalid id, email, statusId', () => {
      const createUser = () => new User(-1, 'email', 0, 100);
      expect(createUser).toThrowError(
        'id must be a positive number, email must be an email, statusId must be a positive number',
      );
      expect(createUser).toThrow(InvalidDataError);
    });
  });
});
