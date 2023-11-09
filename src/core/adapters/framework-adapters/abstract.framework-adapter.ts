import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { SchemaHeaders } from '@common';

import {
  IContextService,
  IDiscoveryService,
  ILoggerService,
  ISchemaService,
  IAbstractFrameworkAdapter,
  NAbstractFrameworkAdapter,
} from '@Core/Types';

@injectable()
export abstract class AbstractFrameworkAdapter implements IAbstractFrameworkAdapter {
  protected abstract readonly _ADAPTER_NAME: string;
  protected abstract _framework: any;
  protected abstract _config: any;
  protected abstract _setConfig(): void;

  protected abstract _discoveryService: IDiscoveryService;
  protected abstract _loggerService: ILoggerService;
  protected abstract _schemaService: ISchemaService;
  protected abstract _contextService: IContextService;

  public abstract start(): Promise<void>;

  protected abstract _apiHandler(): Promise<void>;

  protected _resolveSchemaHeaders(
    headers: Record<string, string>
  ): NAbstractFrameworkAdapter.SchemaPayload {
    if (!headers[SchemaHeaders.X_APPLICATION_NAME]) {
      return {
        status: 'FAIL',
        message: '"X-Application-Name" header not found',
      };
    }
    if (!headers[SchemaHeaders.X_DOMAIN_NAME]) {
      return {
        status: 'FAIL',
        message: '"X-Domain-Name" header not found',
      };
    }
    if (!headers[SchemaHeaders.X_ACTION_NAME]) {
      return {
        status: 'FAIL',
        message: '"X-Action-Name" header not found',
      };
    }

    return {
      status: 'OK',
      application: headers[SchemaHeaders.X_APPLICATION_NAME],
      domain: headers[SchemaHeaders.X_DOMAIN_NAME],
      action: headers[SchemaHeaders.X_ACTION_NAME],
    };
  }

  protected _getNotFoundMessage(
    parameter: NAbstractFrameworkAdapter.FailSchemaParameter
  ): NAbstractFrameworkAdapter.SchemaPayloadFail {
    let message: string;
    switch (parameter) {
      case 'application':
        message = `Incorrect application name`;
        break;
      case 'domain':
        message = `Incorrect domain name`;
        break;
      case 'action':
        message = `Incorrect action name`;
        break;
      case 'action-version':
        message = `Incorrect action version`;
        break;
    }

    return { status: 'FAIL', message };
  }

  protected get throwConfigError(): void {
    throw new Error('Config not initialize');
  }
}
