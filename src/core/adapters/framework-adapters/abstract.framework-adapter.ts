import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { SchemaHeaders } from '@common';

import {
  IContextService,
  IDiscoveryService,
  ILoggerService,
  IAbstractFrameworkAdapter,
  NAbstractFrameworkAdapter,
} from '@Core/Types';

@injectable()
export abstract class AbstractFrameworkAdapter<K extends NAbstractFrameworkAdapter.FrameworkKind>
  implements IAbstractFrameworkAdapter
{
  protected abstract readonly _ADAPTER_NAME: string;
  protected abstract _instance: NAbstractFrameworkAdapter.Instance<K> | undefined;
  protected abstract _config: NAbstractFrameworkAdapter.Config | undefined;
  protected _kind: K | undefined;
  protected abstract _setConfig(): void;

  protected abstract _discoveryService: IDiscoveryService;
  protected abstract _loggerService: ILoggerService;
  protected abstract _contextService: IContextService;

  public abstract start(schemas: any): Promise<void>;

  protected abstract _apiHandler(
    req: NAbstractFrameworkAdapter.Request<K>,
    context: NAbstractFrameworkAdapter.Context
  ): Promise<NAbstractFrameworkAdapter.Response<K>>;

  protected _resolveSchemaHeaders(
    headers: Record<string, string>
  ): NAbstractFrameworkAdapter.SchemaPayload {
    if (!headers[SchemaHeaders.X_SERVICE_NAME]) {
      return {
        ok: false,
        message: '"x-service-name" header not found',
      };
    }
    if (!headers[SchemaHeaders.X_DOMAIN_NAME]) {
      return {
        ok: false,
        message: '"x-domain-name" header not found',
      };
    }
    if (!headers[SchemaHeaders.X_ACTION_NAME]) {
      return {
        ok: false,
        message: '"x-action-name" header not found',
      };
    }

    return {
      ok: true,
      service: headers[SchemaHeaders.X_SERVICE_NAME],
      domain: headers[SchemaHeaders.X_DOMAIN_NAME],
      action: headers[SchemaHeaders.X_ACTION_NAME],
    };
  }
}
