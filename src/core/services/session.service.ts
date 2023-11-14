import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';

import {
  IContextService,
  IDiscoveryService,
  ILoggerService,
  IScramblerService,
  ISessionService,
  NSessionService,
} from '@Core/Types';

@injectable()
export class SessionService extends AbstractService implements ISessionService {
  protected readonly _SERVICE_NAME = SessionService.name;
  protected _config: NSessionService.Config | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.ScramblerService)
    protected readonly _scramblerService: IScramblerService,
    @inject(CoreSymbols.ContextService)
    protected readonly _contextService: IContextService
  ) {
    super();
  }

  private _setConfig() {
    this._config = {
      serverTag: process.env.SERVER_TAG ?? 'default_01',
    };
  }

  protected async init(): Promise<boolean> {
    this._setConfig();
    if (!this._config) throw this._throwConfigError();

    return true;
  }

  protected async destroy(): Promise<void> {
    this._config = undefined;
  }

  private _throwConfigError(): Error {
    return new Error('Config not set');
  }
}
