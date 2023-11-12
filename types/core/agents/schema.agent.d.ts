import { FnObject, UnknownObject } from '@Utility/Types';

export interface ISchemaAgent {
  getAnotherMongoRepository<T extends FnObject = FnObject>(name: string): T;
  getMongoRepository<T extends FnObject = FnObject>(): T;
  getValidator<T extends UnknownObject>(): T;
  getAnotherValidator<T>(name: string): T;
}

export namespace NSchemaAgent {}
