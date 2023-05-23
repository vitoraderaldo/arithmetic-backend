import { User } from "./user";

type Props = {
  amount: number;
}

describe('User', () => {

  let user: User;
  
  beforeEach(() => {
    user = new User(1, 'email@email.com', 1, 100);
  })

  it('must get user data successfully', () => {
    expect(user.getId()).toEqual(1);
    expect(user.getEmail()).toEqual('email@email.com');
    expect(user.getStatusId()).toEqual(1);
    expect(user.getCurrentBalance()).toEqual(100);
  });

  it('must spend money successfully', () => {
    user.spendMoney(30);
    const balance = user.getCurrentBalance()
    expect(balance).toEqual(70);
  })

  it.each`
    amount
    ${0}
    ${-1}
    ${-100}
  `
  ('must not spend money if amount is less than 0', ({amount}: Props) => {
    const spendMoney = () => user.spendMoney(amount);
    expect(spendMoney).toThrowError('Amount must be greater than 0');
  })

  it.each`
    amount
    ${101}
    ${200}
    ${1000}
  `('must not spend money if amount is greater than current balance', ({amount}: Props) => {
    const spendMoney = () => user.spendMoney(amount);
    expect(spendMoney).toThrowError('Amount must be less than current balance');
  })

})
