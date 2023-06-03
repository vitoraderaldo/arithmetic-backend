import { TypeORMTransactional } from './transactional-typeorm';

export const Transactional = (): MethodDecorator => {
  return TypeORMTransactional();
};
