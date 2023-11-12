import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { container } from '../ioc/core.ioc';

import { FnObject, UnknownObject } from '@Utility/Types';
import { ISchemaAgent, ISchemaProvider } from '@Core/Types';

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

  public getAnotherValidator<T>(name: string): T {
    return container.get<ISchemaProvider>(CoreSymbols.SchemaProvider).getAnotherValidator<T>(name);
  }

  public getValidator<T extends UnknownObject>(): T {
    return container.get<ISchemaProvider>(CoreSymbols.SchemaProvider).getValidator<T>();
  }
}
