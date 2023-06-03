export interface ValidatorInterface<T> {
  isValid(entity: T): boolean;
}
