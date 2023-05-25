import { OperationType } from "../operation.types";
import { Operation } from "./operation";

describe('Operation', () => {

  let operation: Operation;
  
  beforeEach(() => {
    operation = new Operation(1, OperationType.ADDITION, 'Addition', 10, 2);
  })

  it('must get operation data successfully', () => {
    expect(operation.getId()).toEqual(1);
    expect(operation.getType()).toEqual(OperationType.ADDITION);
    expect(operation.getCost()).toEqual(10);
    expect(operation.getName()).toEqual('Addition');
    expect(operation.getInputsRequired()).toEqual(2);
  });

})
