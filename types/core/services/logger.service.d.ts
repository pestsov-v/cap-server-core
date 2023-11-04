import { IAbstractService } from '@Core/Types';

export interface ILoggerService extends IAbstractService {
  error(msg: string, options?: NLoggerService.CoreErrorOptions): void;
  warn(msg: string, options?: NLoggerService.CoreWarnOptions): void;
  system(msg: string, options?: NLoggerService.CoreSystemOptions): void;
  api(msg: string, options?: NLoggerService.CoreApiOptions): void;
  database(msg: string, options?: NLoggerService.CoreDatabaseOptions): void;
  storage(msg: string, options?: NLoggerService.CoreStorageOptions): void;
  info(msg: string, options?: NLoggerService.CoreInfoOptions): void;
  schema(msg: string, options?: NLoggerService.CoreSchemaOptions): void;
  verbose(msg: string, options?: NLoggerService.CoreVerboseOptions): void;

  logSchemaError(msg: string, options: NLoggerService.SchemaErrorOptions): void;
  logSchemaException(msg: string, options: NLoggerService.SchemaExceptionOptions): void;
  logSchemaWarn(msg: string, options: NLoggerService.SchemaWarnOptions): void;
  logSchemaApi(msg: string, options: NLoggerService.SchemaApiOptions): void;
  logSchemaInfo(msg: string, options: NLoggerService.SchemaInfoOptions): void;
  logSchemaDebug(msg: string, options: NLoggerService.SchemaDebugOptions): void;
}

export namespace NLoggerService {
  export type Loggers = 'CoreLogger' | 'SchemaLogger';

  export type Config = {
    loggers: {
      core: boolean;
      schema: boolean;
    };
    transports: {
      console: {
        core: {
          enable: boolean;
          level: string;
        };
        schema: {
          enable: boolean;
          level: string;
        };
      };
    };
  };

  export const enum Loggers {
    core = 'CoreLogger',
    schema = 'SchemaLogger',
  }

  export const enum CoreLoggerLevels {
    error = 0,
    warn = 1,
    system = 2,
    api = 3,
    database = 4,
    storage = 5,
    info = 6,
    schema = 7,
    verbose = 8,
  }

  export const enum SchemaLoggerLevels {
    error = 0,
    exception = 1,
    warn = 2,
    api = 3,
    info = 4,
    debug = 5,
  }

  export type ServiceTag = 'Connection' | 'Execution';

  export type ErrorType = 'FATAL' | 'FAIL' | 'EXCEPTION' | 'CUSTOM';

  export interface CoreBaseOptions {
    namespace?: string;
    errorId?: string;
    tag?: ServiceTag;
    traceId?: string;
    requestId?: string;
    sessionId?: string;
  }

  export type ServerScope = 'Schema' | 'Core';
  export interface ScopeOptions {
    scope: ServerScope;
  }

  export interface CoreErrorOptions extends ScopeOptions, CoreBaseOptions {
    scope: 'Core';
    errorType: ErrorType;
  }
  export interface CoreWarnOptions extends ScopeOptions, CoreBaseOptions {
    scope: 'Core';
  }
  export interface CoreSystemOptions extends ScopeOptions, CoreBaseOptions {
    scope: 'Core';
  }
  export interface CoreApiOptions extends ScopeOptions, CoreBaseOptions {
    path: string;
    method: string;
    ip: string;
    statusCode: string;
    responseType?: string;
  }
  export interface CoreDatabaseOptions extends ScopeOptions, CoreBaseOptions {
    scope: 'Core';
  }
  export interface CoreStorageOptions extends ScopeOptions, CoreBaseOptions {
    scope: 'Core';
  }
  export interface CoreInfoOptions extends ScopeOptions, CoreBaseOptions {
    scope: 'Core';
  }
  export interface CoreSchemaOptions extends ScopeOptions, CoreBaseOptions {
    scope: 'Core';
  }
  export interface CoreVerboseOptions extends ScopeOptions, CoreBaseOptions {
    scope: 'Core';
  }

  export interface BaseSchemaOptions {
    application: string;
    collection: string;
    version: string;
    action: string;
    method: string;
    scope?: string;
    tag?: string;
  }

  export interface SchemaErrorOptions extends ScopeOptions, BaseSchemaOptions {}
  export interface SchemaExceptionOptions extends ScopeOptions, BaseSchemaOptions {}
  export interface SchemaWarnOptions extends ScopeOptions, BaseSchemaOptions {}
  export interface SchemaApiOptions extends ScopeOptions, BaseSchemaOptions {
    url?: string;
    statusCode?: string;
  }
  export interface SchemaInfoOptions extends ScopeOptions, BaseSchemaOptions {}
  export interface SchemaDebugOptions extends ScopeOptions, BaseSchemaOptions {}
}
