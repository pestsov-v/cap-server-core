import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractConnector } from './abstract.connector';

import {
  IContextService,
  IDiscoveryService,
  ILoggerService,
  ISchemaService,
  IScramblerService,
  IServiceConnector,
} from '@Core/Types';

@injectable()
export class ServiceConnector extends AbstractConnector implements IServiceConnector {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    private readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(CoreSymbols.ContextService)
    private readonly _contextService: IContextService,
    @inject(CoreSymbols.ScramblerService)
    private readonly _scramblerService: IScramblerService
  ) {
    super();
  }

  public async start(): Promise<void> {
    await this._discoveryService.start();
    await this._loggerService.start();
    await this._scramblerService.start();
    await this._schemaService.start();
    await this._contextService.start();
  }
  public async stop(): Promise<void> {
    await this._contextService.stop();
    await this._schemaService.stop();
    await this._scramblerService.stop();
    await this._loggerService.stop();
    await this._discoveryService.stop();
  }
}
