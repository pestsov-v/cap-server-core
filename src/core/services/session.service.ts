import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { v4 } = Packages.uuid;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';

import {
  IContextService,
  IDiscoveryService,
  ILoggerService,
  IRedisProvider,
  IScramblerService,
  ISessionService,
  NSessionService,
} from '@Core/Types';
import { container } from '../ioc/core.ioc';
import { Nullable, UnknownObject } from '@Utility/Types';

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
      serverTag: this._discoveryService.serverTag,
    };
  }

  protected async init(): Promise<boolean> {
    this._setConfig();
    if (!this._config) throw this._throwConfigError();

    return true;
  }

  public async openHttpSession<T extends UnknownObject>(
    userId: string,
    payload: T
  ): Promise<string> {
    if (!this._config) throw this._throwConfigError();

    const sessionId = v4();
    const id = this._formedSessionId(userId, sessionId);

    try {
      await container
        .get<IRedisProvider>(CoreSymbols.RedisProvider)
        .setWithExpire(id, payload, this._scramblerService.accessExpiredAt);

      return sessionId;
    } catch (e) {
      throw e;
    }
  }

  public async getHttpSessionCount(userId: string): Promise<number> {
    try {
      const id = `userId:${userId}:*`;
      return await container.get<IRedisProvider>(CoreSymbols.RedisProvider).getItemCount(id);
    } catch (e) {
      throw e;
    }
  }

  public async getHttpSessionInfo<T extends UnknownObject>(
    userId: string,
    sessionId: string
  ): Promise<Nullable<T>> {
    const formedSessionId = this._formedSessionId(userId, sessionId);

    try {
      return await container
        .get<IRedisProvider>(CoreSymbols.RedisProvider)
        .getItemInfo<T>(formedSessionId);
    } catch (e) {
      throw e;
    }
  }

  public async deleteHttpSession(userId: string, sessionId: string): Promise<void> {
    try {
      const formedSessionId = this._formedSessionId(userId, sessionId);
      await container.get<IRedisProvider>(CoreSymbols.RedisProvider).deleteItem(formedSessionId);
    } catch (e) {
      throw e;
    }
  }

  protected async destroy(): Promise<void> {
    this._config = undefined;
  }

  private _formedSessionId(userId: string, sessionId: string): string {
    if (!this._config) this._throwConfigError();
    return `userId:${userId}:service:${this._contextService.store.service}:serverTag:${this._config?.serverTag}:sessionId:${sessionId}`;
  }

  private _throwConfigError(): Error {
    return new Error('Config not set');
  }
}
