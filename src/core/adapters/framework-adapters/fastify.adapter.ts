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
  ISchemaAgent,
  IBaseOperationAgent,
  IExceptionProvider,
} from '@Core/Types';
import { ResponseType, StatusCode } from '@common';
import { Helpers } from '../../utility/helpers';
import { container } from '../../ioc/core.ioc';
import { Guards } from '@Guards';

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
    console.log(req.headers);
    console.log(this._schemas);

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
        responseType: ResponseType.FAIL,
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
        responseType: ResponseType.FAIL,
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
      schema: this._schemas,
    };

    try {
      const context: NAbstractFrameworkAdapter.Context = {
        storage: {
          store: store,
        },
        packages: {},
      };

      await this._contextService.storage.run(store, async () => {
        const result = await handler(
          {
            method: req.method,
            headers: req.headers,
            body: req.body,
            params: req.params,
            path: req.routeOptions.url,
            url: req.url,
            query: req.query,
          },
          {
            functionalityAgent: container.get<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent),
            schemaAgent: container.get<ISchemaAgent>(CoreSymbols.SchemaAgent),
            baseAgent: container.get<IBaseOperationAgent>(CoreSymbols.BaseOperationAgent),
          },
          context
        );

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
      if (Guards.isValidationError(e)) {
        const response = container
          .get<IExceptionProvider>(CoreSymbols.ExceptionProvider)
          .resolveValidation(e);
        return res.status(response.statusCode).send(response.payload);
      } else {
        return res.status(StatusCode.SERVER_ERROR).send({
          responseType: ResponseType.ERROR,
          data: {
            message: e,
          },
        });
      }
    } finally {
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
      responseType: ResponseType.FAIL,
      data: { message },
    };
  }
}
