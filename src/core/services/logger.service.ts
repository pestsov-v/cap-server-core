import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { winston, format, transports } = Packages.winston;
import { CoreSymbols } from '@CoreSymbols';

import { AbstractService } from './abstract.service';

import { Winston } from '@Packages/Types';
import { IDiscoveryService, ILoggerService, NLoggerService } from '@Core/Types';
import { Helpers } from '../utility/helpers';
import { level } from 'winston';

@injectable()
export class LoggerService extends AbstractService implements ILoggerService {
  protected readonly _SERVICE_NAME = LoggerService.name;
  protected readonly _loggerService = this;
  private _config: NLoggerService.Config | undefined;
  private _container: Winston.Container | undefined;
  private _loggers: Partial<Record<keyof NLoggerService.Loggers, Winston.Logger>> = {};

  private readonly _LOGGER_TYPES: NLoggerService.Loggers = {
    core: 'CoreLogger',
    schema: 'SchemaLogger',
  };

  private readonly _CORE_LEVELS: NLoggerService.CoreLoggerLevels = {
    error: 0,
    warn: 1,
    system: 2,
    api: 3,
    database: 4,
    storage: 5,
    info: 6,
    schema: 7,
    verbose: 8,
  };

  private readonly _SCHEMA_LOGGERS: NLoggerService.SchemaLoggerLevels = {
    error: 0,
    exception: 1,
    warn: 2,
    api: 3,
    info: 4,
    debug: 5,
  };

  private readonly _LOGGER_COLORS: NLoggerService.LoggerColors = {
    error: 'bold red',
    exception: 'red',
    warn: 'yellow',
    system: 'cyan',
    api: 'bold green',
    database: 'magenta',
    storage: 'yellow',
    info: 'blue',
    schema: 'yellow',
    verbose: 'gray',
    debug: 'bold green',
  };

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService
  ) {
    super();
    winston.addColors(this._LOGGER_COLORS);
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

    if (!this._config) {
      console.log(`Config for ${this._SERVICE_NAME} not initialize`);
      return false;
    }

    this._container = new winston.Container();
    if (this._config.loggers.core) {
      const coreTransports: Winston.transport[] = [];
      if (this._config.transports.console.core.enable) {
        coreTransports.push(this._consoleCoreTransport);
      }

      this._container.add(this._LOGGER_TYPES.core, {
        levels: this._CORE_LEVELS,
        transports: coreTransports,
      });
    }

    this._loggers.core = this._container.get(this._LOGGER_TYPES.core);

    return typeof this._config !== 'undefined';
  }

  public async destroy(): Promise<void> {}

  public error(msg: any, options?: NLoggerService.CoreErrorOptions): void {
    if (this._loggers.core) {
      this._loggers.core.log('error', { msg, ...options });
    }
  }

  public warn(msg: string, options?: NLoggerService.CoreWarnOptions): void {
    if (this._loggers.core) {
      this._loggers.core.log('warn', { msg, ...options });
    }
  }

  public system(msg: string, options?: NLoggerService.CoreSystemOptions): void {
    if (this._loggers.core) {
      this._loggers.core.log('system', { msg, ...options });
    }
  }

  public api(options: NLoggerService.CoreApiOptions): void {
    if (this._loggers.core) {
      this._loggers.core.log('api', { ...options });
    }
  }

  public database(msg: string, options?: NLoggerService.CoreDatabaseOptions): void {
    throw new Error('Method not implemented');
  }

  public storage(msg: string, options?: NLoggerService.CoreStorageOptions): void {
    throw new Error('Method not implemented');
  }

  public info(msg: string, options?: NLoggerService.CoreInfoOptions): void {
    throw new Error('Method not implemented');
  }

  public schema(msg: string, options?: NLoggerService.CoreSchemaOptions): void {
    throw new Error('Method not implemented');
  }

  public verbose(msg: string, options?: NLoggerService.CoreVerboseOptions): void {
    throw new Error('Method not implemented');
  }

  public logSchemaError(msg: string, options: NLoggerService.SchemaErrorOptions): void {
    throw new Error('Method not implemented');
  }
  public logSchemaException(msg: string, options: NLoggerService.SchemaExceptionOptions): void {
    throw new Error('Method not implemented');
  }
  public logSchemaWarn(msg: string, options: NLoggerService.SchemaWarnOptions): void {
    throw new Error('Method not implemented');
  }
  public logSchemaApi(msg: string, options: NLoggerService.SchemaApiOptions): void {
    throw new Error('Method not implemented');
  }
  public logSchemaInfo(msg: string, options: NLoggerService.SchemaInfoOptions): void {
    throw new Error('Method not implemented');
  }
  public logSchemaDebug(msg: string, options: NLoggerService.SchemaDebugOptions): void {
    throw new Error('Method not implemented');
  }

  private get _consoleCoreTransport() {
    if (!this._config) {
      throw new Error('Config is not initialize');
    }
    return new transports.Console({
      level: this._config.transports.console.core.level,
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info) => {
          const baseOptions = () => {
            if (info.tag) str += 'Tag: ' + info.tag + '\n';
            if (info.requestId) str += 'RequestId: ' + info.requestId + '\n';
            if (info.errorId) str += 'ErrorId: ' + info.errorId + '\n';
            if (info.traceId) str += 'TraceId: ' + info.traceId + '\n';
            if (info.sessionId) str += 'SessionId: ' + info.sessionId;
          };
          let str = info.timestamp + ' ';
          const namespace = Helpers.addBrackets(Helpers.centralized(20, info.namespace));
          const coreLevels = info.level as keyof NLoggerService.CoreLoggerLevels;
          switch (coreLevels) {
            case 'error':
              str += Helpers.addLevel(info.level, 'black', 'red');
              str += namespace;
              str += info.msg.stack;
              str += '\n';
              if (info.errorType) str += 'Type: ' + info.errorType + '\n';
              baseOptions();
              break;
            case 'warn':
              str += Helpers.addLevel(info.level, 'bgGreen', 'yellow');
              str += namespace;
              str += info.msg;
              str += '\n';
              baseOptions();
              break;
            case 'schema':
              str += Helpers.addLevel(info.level, 'bgBlack', 'yellow');
              str += namespace;
              str += info.msg;
              str += '\n';
              baseOptions();
              break;
            case 'system':
              str += Helpers.addLevel(info.level, 'bgMagenta', 'green');
              str += namespace;
              str += info.msg;
              break;
            case 'api':
              str += '{ ';
              str += 'Application: ' + info.application + ' ';
              str += 'Collection: ' + info.collection + ' ';
              str += 'Action: ' + info.version + '/' + info.action;
              str += ' } ';
              str += info.method.toUpperCase() + ' | ' + info.path + '\n';
              str += ' '.repeat(3);
              str += 'RequestId: ' + info.requestId;
              break;
            case 'database':
            case 'storage':
            case 'info':
            case 'verbose':
              throw new Error(`Console level "${level}" not implemented`);
          }

          return str;
        }),
        format.colorize({ all: true })
      ),
    });
  }
}
