import { FnObject, KeyStringLiteralBuilder, UnknownObject } from '../utility';
import { NSchemaProvider } from '../providers';

export interface ISchemaAgent {
  getAnotherMongoRepository<T extends FnObject = FnObject>(name: string): T;
  getMongoRepository<T extends FnObject = FnObject>(): T;
  getValidator<T extends UnknownObject>(cast: NSchemaProvider.Cast): T;
  getAnotherValidator<T>(name: string, cast: NSchemaProvider.Cast): T;
  getTypeormRepository<T extends FnObject = FnObject>(): T;
  getAnotherTypeormRepository<T extends FnObject = FnObject>(name: string): T;
  getAnotherResource<D extends string, DICT extends Record<string, unknown>, L extends string>(
    name: D,
    resource: KeyStringLiteralBuilder<DICT>,
    substitutions?: Record<string, string>,
    language?: L
  ): string;
  getResource<D extends Record<string, unknown>, L extends string>(
    resource: KeyStringLiteralBuilder<D>,
    substitutions?: Record<string, string>,
    language?: L
  ): string;
}

export namespace NSchemaAgent {}
