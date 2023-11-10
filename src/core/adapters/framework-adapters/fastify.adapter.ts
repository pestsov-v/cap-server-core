import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { fastify } = Packages.fastify;
const { v4 } = Packages.uuid;

import { CoreSymbols } from '@CoreSymbols';
import { AbstractFrameworkAdapter } from './abstract.framework-adapter';

import {
  IContextService,
  IDiscoveryService,
  ILoggerService,
  IAbstractFrameworkAdapter,
  NAbstractFrameworkAdapter,
  NSchemaLoader,
  IFunctionalityAgent,
  NContextService,
  ISchemaLoader,
  ISchemaProvider,
} from '@Core/Types';
import { ResponseType, StatusCode } from '@common';
import { Helpers } from '../../utility/helpers';
import { container } from '../../ioc/core.ioc';

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
  ): Promise<void> => {
    if (!this._schemas) {
      throw new Error('Business services schema not initialize');
    }
    const schemaResult = this._resolveSchemaHeaders(req.headers);
    if (!schemaResult.ok) {
      return res.status(StatusCode.BAD_REQUEST).send({
        ResponseType: ResponseType.FAIL,
        data: {
          message: schemaResult.message,
        },
      });
    }

    const service = this._schemas.get(schemaResult.service);
    if (!service) {
      return res.status(StatusCode.BAD_REQUEST).send(this._getNotFoundStructure('service'));
    }

    const domain = service.get(schemaResult.domain);
    if (!domain) {
      return res.status(StatusCode.BAD_REQUEST).send(this._getNotFoundStructure('domain'));
    }

    if (!domain.routes || !domain.controllers) {
      return res.status(StatusCode.BAD_REQUEST).send({
        ResponseType: ResponseType.FAIL,
        data: {
          message: 'Domain does not have any routes',
        },
      });
    }

    const act = schemaResult.action + '{{' + req.method.toUpperCase() + '}}';
    const action = domain.routes.get(act);
    if (!action) {
      return res.status(StatusCode.BAD_REQUEST).send(this._getNotFoundStructure('action'));
    }

    const handler = domain.controllers.get(action.handler);
    if (!handler) {
      return res.status(StatusCode.BAD_REQUEST).send({
        ResponseType: ResponseType.FAIL,
        data: {
          message: 'Domain does not have any routes',
        },
      });
    }

    const store: NContextService.Store = {
      service: schemaResult.service,
      domain: schemaResult.domain,
      action: schemaResult.action,
      method: req.method,
      path: req.url,
      ip: req.ip,
      requestId: v4(),
    };

    try {
      const context: NAbstractFrameworkAdapter.Context = {
        agents: {
          functionalityAgent: container.get<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent),
        },
        storage: {
          store: store,
          schema: container.get<ISchemaProvider>(CoreSymbols.SchemaProvider).routines,
        },
        packages: {},
      };

      await this._contextService.storage.run(store, async () => {
        const result = await handler<'fastify'>(
          {
            method: req.method,
            headers: req.headers,
            body: req.body,
            params: req.params,
            path: req.routeOptions.url,
            url: req.url,
            query: req.query,
          },
          context
        );

        console.log(handler);
        // console.log(await handler<'fastify'>(req, context));

        if (!result) {
          return res.status(StatusCode.NO_CONTENT).send();
        }

        switch (result.format) {
          case 'json':
            return res.status(result.statusCode || StatusCode.SUCCESS).send({
              format: result.format,
              type: result.type,
              data: result.data,
            });
          case 'status':
            return res.status(result.statusCode || StatusCode.NO_CONTENT).send();
          case 'redirect':
            return res.status(result.StatusCode || StatusCode.FOUND).redirect(result.url);
          default:
            throw Helpers.switchChecker(result);
        }
      });
    } catch (e) {
      this._contextService.exit();
    }
  };

  private _getNotFoundStructure(param: NAbstractFrameworkAdapter.FailSchemaParameter) {
    let message: string;
    switch (param) {
      case 'service':
        message = `Service "${param}" not found`;
        break;
      case 'domain':
        message = `Service "${param}" not found`;
        break;
      case 'action':
        message = `Service "${param}" not found`;
        break;
      default:
        throw Helpers.switchChecker(param);
    }

    return {
      ResponseType: ResponseType.FAIL,
      data: { message },
    };
  }
}
