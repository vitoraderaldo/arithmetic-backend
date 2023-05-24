import { OperationType } from "../operation.types";

export class Operation {

  constructor(
    private id: number,
    private type: OperationType,
    private cost: number,
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

}
