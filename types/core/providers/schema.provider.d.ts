import { NSchemaLoader } from '../loaders';
import { FnObject } from '@Utility/Types';

export interface ISchemaProvider {
  getMongoRepository<T extends FnObject = FnObject>(): T;
  getAnotherMongoRepository<T extends FnObject = FnObject>(name: string): T;
}

export namespace NSchemaProvider {
  export type Helpers = Map<string, NSchemaLoader.HelperHandler>;
}
