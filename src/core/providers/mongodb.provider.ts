import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { container } from '../ioc/core.ioc';
import { CoreSymbols } from '@CoreSymbols';

import {
  IContextService,
  IDiscoveryService,
  IFunctionalityAgent,
  ILoggerService,
  IMongodbConnector,
  IMongodbProvider,
  NAbstractFrameworkAdapter,
  NMongodbProvider,
} from '@Core/Types';

@injectable()
export class MongodbProvider implements IMongodbProvider {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    private readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.ContextService)
    private readonly _contextService: IContextService,
    @inject(CoreSymbols.MongodbConnector)
    private readonly _mongodbConnector: IMongodbConnector
  ) {}

  public setModels(fnModels: NMongodbProvider.SchemaFn<unknown>[]) {
    const { connection } = this._mongodbConnector;

    fnModels.forEach((fn) => {
      const agents: NAbstractFrameworkAdapter.Agents = {
        functionalityAgent: container.get<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent),
      };

      const model = fn(agents);

      const schema = model.options
        ? new connection.Schema(model.definition, model.options)
        : new connection.Schema(model.definition);

      connection.model(model.model, schema);
    });
  }
}
