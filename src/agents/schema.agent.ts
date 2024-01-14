import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { container } from '../ioc/core.ioc';

import {
  FnObject,
  UnknownObject,
  ISchemaAgent,
  ISchemaProvider,
  KeyStringLiteralBuilder,
  NSchemaProvider,
} from '@Core/Types';
import { ca } from 'date-fns/locale';

@injectable()
export class SchemaAgent implements ISchemaAgent {
  constructor() {}

  public getAnotherMongoRepository<T extends FnObject = FnObject>(name: string): T {
    return container
      .get<ISchemaProvider>(CoreSymbols.SchemaProvider)
      .getAnotherMongoRepository<T>(name);
  }

  public getMongoRepository<T extends FnObject = FnObject>(): T {
    return container.get<ISchemaProvider>(CoreSymbols.SchemaProvider).getMongoRepository<T>();
  }

  public getAnotherValidator<T>(name: string, cast: NSchemaProvider.Cast): T {
    return container
      .get<ISchemaProvider>(CoreSymbols.SchemaProvider)
      .getAnotherValidator<T>(name, cast);
  }

  public getValidator<T extends UnknownObject>(cast: NSchemaProvider.Cast): T {
    return container.get<ISchemaProvider>(CoreSymbols.SchemaProvider).getValidator<T>(cast);
  }

  public getAnotherTypeormRepository<T extends FnObject = FnObject>(name: string): T {
    return container
      .get<ISchemaProvider>(CoreSymbols.SchemaProvider)
      .getAnotherTypeormRepository(name);
  }

  public getTypeormRepository<T extends FnObject = FnObject>(): T {
    return container.get<ISchemaProvider>(CoreSymbols.SchemaProvider).getTypeormRepository<T>();
  }

  public getAnotherResource<
    D extends string,
    DICT extends Record<string, unknown>,
    L extends string
  >(
    domain: D,
    resource: KeyStringLiteralBuilder<DICT>,
    substitutions?: Record<string, string>,
    language?: L
  ): string {
    return container
      .get<ISchemaProvider>(CoreSymbols.SchemaProvider)
      .getAnotherResource(domain, resource, substitutions, language);
  }

  public getResource<D extends Record<string, unknown>, L extends string>(
    resource: KeyStringLiteralBuilder<D>,
    substitutions?: Record<string, string>,
    language?: L
  ): string {
    return container
      .get<ISchemaProvider>(CoreSymbols.SchemaProvider)
      .getResource(resource, substitutions, language);
  }
}
