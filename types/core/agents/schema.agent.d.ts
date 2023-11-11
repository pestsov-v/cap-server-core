import { FnObject } from '@Utility/Types';

export interface ISchemaAgent {
  getAnotherMongoRepository<T extends FnObject = FnObject>(name: string): T;
  getMongoRepository<T extends FnObject = FnObject>(): T;
}

export namespace NSchemaAgent {}
