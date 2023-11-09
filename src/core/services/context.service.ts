import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { AsyncLocalStorage } = Packages.async_hooks;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';

import { AsyncHooks } from '@Packages/Types';
import { IContextService, IDiscoveryService, ILoggerService, NContextService } from '@Core/Types';

@injectable()
export class ContextService extends AbstractService implements IContextService {
  protected readonly _SERVICE_NAME = ContextService.name;
  protected _storage: AsyncHooks.AsyncLocalStorage<NContextService.Store> | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected _loggerService: ILoggerService
  ) {
    super();
  }

  protected async init(): Promise<boolean> {
    this._storage = new AsyncLocalStorage<NContextService.Store>();

    return true;
  }

  public get run(): AsyncHooks.AsyncLocalStorage<NContextService.Store>['run'] {
    if (!this._storage) throw this._throwStorageError();
    return this._storage.run;
  }

  public get store(): NContextService.Store {
    if (!this._storage) throw this._throwStorageError();

    const store = this._storage.getStore();
    if (!store) {
      throw new Error('Async local store not found');
    }
    return store;
  }

  public exit(callback?: () => void): void {
    if (!this._storage) throw this._throwStorageError();
    return this._storage.exit(() => {
      if (callback) callback();
    });
  }

  private _throwStorageError() {
    throw new Error('Storage not initialize');
  }

  protected async destroy(): Promise<void> {
    if (this._storage) {
      this._storage.exit(() => {});
      this._storage = undefined;
    }
  }
}
