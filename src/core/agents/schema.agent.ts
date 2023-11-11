import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import { FnObject } from '@Utility/Types';
import { ISchemaAgent, ISchemaProvider } from '@Core/Types';
import { container } from '../ioc/core.ioc';

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
}
