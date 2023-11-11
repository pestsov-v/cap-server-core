import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { v4 } = Packages.uuid;
import { container } from '../ioc/core.ioc';
import { Mongoose } from '@Packages/Types';
import { CoreSymbols } from '@CoreSymbols';

import {
  IDiscoveryService,
  IFunctionalityAgent,
  IMongodbProvider,
  NFunctionalityAgent,
} from '@Core/Types';

@injectable()
export class FunctionalityAgent implements IFunctionalityAgent {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService
  ) {}

  public get discovery(): NFunctionalityAgent.Discovery {
    return {
      getMandatory: <T>(name: string): T => {
        return this._discoveryService.getSchemaMandatory<T>(name);
      },
      getString: (name: string, def: string): string => {
        return this._discoveryService.getSchemaString(name, def);
      },
      getNumber: (name: string, def: number): number => {
        return this._discoveryService.getSchemaNumber(name, def);
      },
      getBoolean: (name: string, def: boolean): boolean => {
        return this._discoveryService.getSchemaBoolean(name, def);
      },
      getArray: <T>(name: string, def: Array<T>): Array<T> => {
        return this._discoveryService.getSchemaArray<T>(name, def);
      },
      getBuffer: async (path: string): Promise<Buffer> => {
        return this._discoveryService.getSchemaBuffer(path);
      },
    };
  }

  public get mongoose(): NFunctionalityAgent.Mongoose {
    return {
      create: async <T>(
        model: string,
        docs: Mongoose.Docs<T>,
        options: Mongoose.SaveOptions
      ): Promise<Mongoose.AnyKeys<T>> => {
        return container
          .get<IMongodbProvider>(CoreSymbols.MongodbProvider)
          .create(model, docs, options);
      },
    };
  }

  public get utils(): NFunctionalityAgent.Utils {
    return {
      uuid: v4(),
    };
  }
}
