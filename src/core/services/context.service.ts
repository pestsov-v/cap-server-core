import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;

import { AbstractService } from './abstract.service';
import { IContextService, IDiscoveryService, ILoggerService } from '@Core/Types';
import { CoreSymbols } from '@CoreSymbols';

@injectable()
export class ContextService extends AbstractService implements IContextService {
  protected readonly _SERVICE_NAME = ContextService.name;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected _loggerService: ILoggerService
  ) {
    super();
  }

  protected async init(): Promise<boolean> {
    return true;
  }

  protected async destroy(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
