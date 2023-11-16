import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { v4 } = Packages.uuid;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';

import {
  ICacheService,
  IDiscoveryService,
  ILoggerService,
  IRedisProvider,
  IScramblerService,
  NCacheService,
} from '@Core/Types';
import { container } from '../ioc/core.ioc';

@injectable()
export class CacheService extends AbstractService implements ICacheService {
  protected readonly _SERVICE_NAME = CacheService.name;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.ScramblerService)
    private readonly _scramblerService: IScramblerService
  ) {
    super();
  }

  protected async init(): Promise<boolean> {
    return Promise.resolve(false);
  }

  protected async destroy(): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async setItem<T>(id: string, data: T): Promise<void> {
    const cacheId = `cacheId:${id}`;
    const payload: NCacheService.CachePayload<T> = {
      payload: data,
      cacheVersion: 1,
      updateFlag: 'actual',
      validFlag: 'valid',
    };

    try {
      await container
        .get<IRedisProvider>(CoreSymbols.RedisProvider)
        .setItemInfo<NCacheService.CachePayload<T>>(cacheId, payload);
    } catch (e) {
      throw e;
    }
  }

  public async checkItem(id: string): Promise<boolean> {
    const counts = await container.get<IRedisProvider>(CoreSymbols.RedisProvider).getItemCount(id);
    return counts > 0;
  }
}
