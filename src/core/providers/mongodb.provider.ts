import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import {
  IContextService,
  IDiscoveryService,
  ILoggerService,
  IMongodbConnector,
  IMongodbProvider,
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
}
