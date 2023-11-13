import { NSchemaLoader } from '../loaders';
import { FnObject, UnknownObject } from '@Utility/Types';

export interface ISchemaProvider {
  getMongoRepository<T extends FnObject = FnObject>(): T;
  getAnotherMongoRepository<T extends FnObject = FnObject>(name: string): T;
  getValidator<T extends UnknownObject>(): T;
  getAnotherValidator<T>(name: string): T;
  getTypeormRepository<T>(): T;
  getAnotherTypeormRepository<T>(name: string): T;
}

export namespace NSchemaProvider {
  export type Helpers = Map<string, NSchemaLoader.HelperHandler>;
}
