import { AdditionCalculator } from "./addition-calculator";

type Props = {
  a: number;
  b: number;
  result: number;
}

describe('Addition Calculator', () => {
  
  let additionCalculator: AdditionCalculator;

  beforeEach(() => {
    additionCalculator = new AdditionCalculator();
  })

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  it('must be defined', () => {
    expect(additionCalculator).toBeDefined();
  })

  it.each`
    a     | b     | result
    ${1}  | ${2}  | ${3}
    ${2}  | ${3}  | ${5}
    ${3}  | ${0}  | ${3}
  `('must calculate the addition operation', ({ a, b, result }: Props) => {
    const response = additionCalculator.calculate(a, b);
    expect(response).toEqual(result);
  })

});
