import { Operation } from "../../calculator/entity/operation";
import { OperationType } from "../../calculator/operation.types";
import { User } from "../../user/entity/user";
import { Record } from "./record";

describe('Record', () => {

  describe('Create new Record', () => {
    it('must create a new record successfully', () => {
      const user = new User(1, 'email@email.com', 1, 100);
      const operation = new Operation(1, OperationType.ADDITION, 'Addition', 10, 2);
      const result = '10';
      
      const record = Record.createNewRecord(user, operation, result);
      expect(record.getId()).toBeDefined();
      expect(record.getOperationId()).toBe(operation.getId());
      expect(record.getUserId()).toBe(user.getId());
      expect(record.getAmount()).toBe(operation.getCost());
      expect(record.getUserBalance()).toBe(user.getCurrentBalance());
      expect(record.getOperationResponse()).toBe(result);
      expect(record.getCreatedAt()).toBeDefined();
    })
  })

  describe('Create from existing record', () => {
    it('must create from existing data', () => {
      const id = '1';
      const operationId = 1;
      const userId = 1;
      const amount = 10;
      const userBalance = 100;
      const operationResponse = '10';
      const createdAt = new Date();

      const record = Record.createFromExistingRecord(id, operationId, userId, amount, userBalance, operationResponse, createdAt);
      expect(record.getId()).toBe(id);
      expect(record.getOperationId()).toBe(operationId);
      expect(record.getUserId()).toBe(userId);
      expect(record.getAmount()).toBe(amount);
      expect(record.getUserBalance()).toBe(userBalance);
      expect(record.getOperationResponse()).toBe(operationResponse);
      expect(record.getCreatedAt()).toBe(createdAt);
    })
  })

})
