import { OperationType } from '../operation.types';
import { Operation } from './operation';

describe('Operation', () => {
  let operation: Operation;

  beforeEach(() => {
    operation = new Operation(1, OperationType.ADDITION, 'Addition', 10, 2);
  });

  it('must get operation data successfully', () => {
    expect(operation.getId()).toEqual(1);
    expect(operation.getType()).toEqual(OperationType.ADDITION);
    expect(operation.getCost()).toEqual(10);
    expect(operation.getName()).toEqual('Addition');
    expect(operation.getInputsRequired()).toEqual(2);
  });

  it('must not create operation with negative number of inputs', () => {
    const createOperation = () =>
      new Operation(1, OperationType.ADDITION, 'Addition', 10, -1);
    expect(createOperation).toThrowError(
      'Operation inputs required must be greater than or equal to 0',
    );
  });

  it('must not create operation with invalid id, name, cost, type', () => {
    const createOperation = () => new Operation(-1, null, '', 0, 2);
    expect(createOperation).toThrowError(
      'id must be a positive number, type must be one of the following values: ADDITION, SUBTRACTION, MULTIPLICATION, DIVISION, SQUARE_ROOT, RANDOM_STRING, name must be longer than or equal to 1 characters, cost must be a positive number',
    );
  });
});
