import { NSchemaLoader } from '../loaders';
import { FnObject, KeyStringLiteralBuilder, UnknownObject } from '../utility';

export interface ISchemaProvider {
  getMongoRepository<T extends FnObject = FnObject>(): T;
  getAnotherMongoRepository<T extends FnObject = FnObject>(name: string): T;
  getValidator<T extends UnknownObject>(cast: NSchemaLoader.Cast): T;
  getAnotherValidator<T>(name: string, cast: NSchemaLoader.Cast): T;
  getTypeormRepository<T>(): T;
  getAnotherTypeormRepository<T>(name: string): T;
  getResource<D extends Record<string, unknown>, L extends string>(
    resource: KeyStringLiteralBuilder<D>,
    substitutions?: Record<string, string>,
    language?: L
  ): string;
  getAnotherResource<D extends string, DICT extends Record<string, unknown>, L extends string>(
    name: D,
    resource: KeyStringLiteralBuilder<DICT>,
    substitutions?: Record<string, string>,
    language?: L
  ): string;
}

export namespace NSchemaProvider {
  export type Helpers = Map<string, NSchemaLoader.HelperHandler>;

  export type Cast = 'in' | 'out';
}
