import { OperationType } from "../operation.types";

export class Operation {

  constructor(
    private id: number,
    private type: OperationType,
    private name: string,
    private cost: number,
    private inputsRequired: number,
  ) {}

  getId(): number {
    return this.id;
  }

  getType(): OperationType {
    return this.type;
  }

  getCost(): number {
    return this.cost;
  }

  getName(): string {
    return this.name;
  }

  getInputsRequired(): number {
    return this.inputsRequired;
  }

}
