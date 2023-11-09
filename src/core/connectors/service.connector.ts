import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractConnector } from './abstract.connector';

import {
  IContextService,
  IDiscoveryService,
  ILoggerService,
  ISchemaService,
  IServiceConnector,
} from '@Core/Types';

@injectable()
export class ServiceConnector extends AbstractConnector implements IServiceConnector {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    private _loggerService: ILoggerService,
    @inject(CoreSymbols.SchemaService)
    private _schemaService: ISchemaService,
    @inject(CoreSymbols.ContextService)
    private _contextService: IContextService
  ) {
    super();
  }

  public async start(): Promise<void> {
    await this._discoveryService.start();
    await this._loggerService.start();
    await this._schemaService.start();
    await this._contextService.start();
  }
  public async stop(): Promise<void> {
    await this._contextService.stop();
    await this._schemaService.stop();
    await this._loggerService.stop();
    await this._discoveryService.stop();
  }
}
