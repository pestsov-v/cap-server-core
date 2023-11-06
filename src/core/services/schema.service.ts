import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;

import { AbstractService } from './abstract.service';
import { IDiscoveryService, ILoggerService, ISchemaService } from '@Core/Types';
import { CoreSymbols } from '@CoreSymbols';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected readonly _SERVICE_NAME = SchemaService.name;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected _loggerService: ILoggerService
  ) {
    super();
  }

  protected async init() {
    return true;
  }
  protected async destroy(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
