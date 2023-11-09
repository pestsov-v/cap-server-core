import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { AbstractFrameworkAdapter } from './abstract.framework-adapter';
import { inject } from 'inversify';
import { CoreSymbols } from '@CoreSymbols';
import {
  IContextService,
  IDiscoveryService,
  ILoggerService,
  ISchemaService,
  IAbstractFrameworkAdapter,
} from '@Core/Types';

@injectable()
export class FastifyAdapter extends AbstractFrameworkAdapter implements IAbstractFrameworkAdapter {
  protected readonly _ADAPTER_NAME = FastifyAdapter.name;
  protected readonly _config: any;
  protected readonly _framework: any;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.SchemaService)
    protected readonly _schemaService: ISchemaService,
    @inject(CoreSymbols.ContextService)
    protected readonly _contextService: IContextService
  ) {
    super();
  }

  protected _setConfig(): void {}

  public async start(): Promise<void> {}

  protected async _apiHandler(): Promise<void> {}
}
