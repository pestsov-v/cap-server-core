import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { fastify } = Packages.fastify;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractFrameworkAdapter } from './abstract.framework-adapter';

import {
  IContextService,
  IDiscoveryService,
  ILoggerService,
  IAbstractFrameworkAdapter,
  NAbstractFrameworkAdapter,
  NSchemaLoader,
} from '@Core/Types';

@injectable()
export class FastifyAdapter
  extends AbstractFrameworkAdapter<'fastify'>
  implements IAbstractFrameworkAdapter
{
  protected readonly _ADAPTER_NAME = FastifyAdapter.name;
  protected _config: NAbstractFrameworkAdapter.Config | undefined;
  protected _instance: NAbstractFrameworkAdapter.Instance<'fastify'> | undefined;
  private _schemas: NSchemaLoader.Services | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.ContextService)
    protected readonly _contextService: IContextService
  ) {
    super();
  }

  protected _setConfig(): void {
    this._config = {
      serverTag: this._discoveryService.getString('adapters:framework:serverTag', 'ANONYMOUS_01'),
      protocol: this._discoveryService.getString('adapters:framework:protocol', 'http'),
      host: this._discoveryService.getString('adapters:framework:host', 'localhost'),
      port: this._discoveryService.getNumber('adapters:framework:port', 11000),
      urls: {
        api: this._discoveryService.getString('adapters:framework:urls:api', 'v1/call/api'),
      },
    };
  }

  public async start(schemas: NSchemaLoader.Services): Promise<void> {
    this._schemas = schemas;
    this._setConfig();

    if (!this._config) {
      throw new Error('Config not initialize');
    }

    this._instance = fastify({});
    this._instance.all(this._config.urls.api, this._apiHandler);

    const { protocol, host, port } = this._config;

    try {
      await this._instance.listen({ host, port }, () => {
        if (this._config) {
          this._loggerService.system(`Http server listening on ${protocol}://${host}:${port}`, {
            scope: 'Core',
            namespace: this._ADAPTER_NAME,
            tag: 'Connection',
          });
        } else {
          console.log(`Http server is started`);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  protected _apiHandler = async (
    req: NAbstractFrameworkAdapter.Request<'fastify'>,
    res: NAbstractFrameworkAdapter.Response<'fastify'>
  ): Promise<void> => {};
}
