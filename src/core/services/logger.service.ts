import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import { AbstractService } from './abstract.service';

import { IDiscoveryService, ILoggerService, NLoggerService } from '@Core/Types';

@injectable()
export class LoggerService extends AbstractService implements ILoggerService {
  protected readonly _SERVICE_NAME = LoggerService.name;
  private _config: NLoggerService.Config | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private _discoveryService: IDiscoveryService
  ) {
    super();
  }

  private _setConfig(): void {
    this._config = {
      loggers: {
        core: this._discoveryService.getBoolean('services:logger:loggers:core', true),
        schema: this._discoveryService.getBoolean('services:logger:loggers:schema', true),
      },
      transports: {
        console: {
          core: {
            enable: this._discoveryService.getBoolean(
              'services:logger:transports:console:core:enable',
              true
            ),
            level: this._discoveryService.getString(
              'services:logger:transports:console:core:level',
              'schema'
            ),
          },
          schema: {
            enable: this._discoveryService.getBoolean(
              'services:logger:transports:console:schema:enable',
              true
            ),
            level: this._discoveryService.getString(
              'services:logger:transports:console:schema:level',
              'debug'
            ),
          },
        },
      },
    };
  }

  public async init(): Promise<boolean> {
    this._setConfig();
    this._discoveryService.on('service:DiscoveryService:reload', () => {
      this._setConfig();
    });

    return typeof this._config !== 'undefined';
  }

  public async destroy(): Promise<void> {}

  public error(msg: string, options?: NLoggerService.CoreErrorOptions): void {}
  public warn(msg: string, options?: NLoggerService.CoreWarnOptions): void {}
  public system(msg: string, options?: NLoggerService.CoreSystemOptions): void {}
  public api(msg: string, options?: NLoggerService.CoreApiOptions): void {}
  public database(msg: string, options?: NLoggerService.CoreDatabaseOptions): void {}
  public storage(msg: string, options?: NLoggerService.CoreStorageOptions): void {}
  public info(msg: string, options?: NLoggerService.CoreInfoOptions): void {}
  public schema(msg: string, options?: NLoggerService.CoreSchemaOptions): void {}
  public verbose(msg: string, options?: NLoggerService.CoreVerboseOptions): void {}

  public logSchemaError(msg: string, options: NLoggerService.SchemaErrorOptions): void {}
  public logSchemaException(msg: string, options: NLoggerService.SchemaExceptionOptions): void {}
  public logSchemaWarn(msg: string, options: NLoggerService.SchemaWarnOptions): void {}
  public logSchemaApi(msg: string, options: NLoggerService.SchemaApiOptions): void {}
  public logSchemaInfo(msg: string, options: NLoggerService.SchemaInfoOptions): void {}
  public logSchemaDebug(msg: string, options: NLoggerService.SchemaDebugOptions): void {}
}
