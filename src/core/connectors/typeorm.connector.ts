import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { DataSource } = Packages.typeorm;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractConnector } from './abstract.connector';

import { Typeorm } from '@Packages/Types';
import {
  IDiscoveryService,
  ILoggerService,
  ITypeormConnector,
  NTypeormConnector,
} from '@Core/Types';
import { Voidable } from '@Utility/Types';

@injectable()
export class TypeormConnector extends AbstractConnector implements ITypeormConnector {
  private _connection: Typeorm.DataSource | undefined;
  private _config: NTypeormConnector.Config | undefined;
  private _entities: Typeorm.EntitySchema<unknown>[] | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    private readonly _loggerService: ILoggerService
  ) {
    super();
  }

  private _setConfig(): void {
    this._config = {
      enable: this._discoveryService.getBoolean('connectors:typeorm:enable', false),
      type: this._discoveryService.getMandatory<Typeorm.DatabaseType>(
        'connectors:typeorm:connect:dbType'
      ),
      host: this._discoveryService.getString('connectors:typeorm:connect:host', 'localhost'),
      port: this._discoveryService.getNumber('connectors:typeorm:connect:port', 5432),
      username: this._discoveryService.getString('connectors:typeorm:auth:username', ''),
      password: this._discoveryService.getString('connectors:typeorm:auth:password', ''),
      database: this._discoveryService.getString('connectors:typeorm:connect:database', ''),
    };
  }

  public async start(): Promise<void> {
    this._setConfig();

    if (!this._config) {
      throw new Error('Config is not set');
    }

    this._emitter.emit('connector:TypeormConnector:start');
    this._emitter.on(
      'connector:TypeOrmConnector:entities:load',
      (entities: Typeorm.EntitySchema<unknown>[]) => {
        this._entities = entities;
      }
    );

    if (!this._entities) {
      throw new Error('Entities is not set');
    }

    try {
      const { type, host, port, database, password, username } = this._config;
      const options: Typeorm.DataSourceOptions = {
        type: type,
        host: host,
        port: port,
        database: database,
        username: username,
        password: password,
        useUTC: true,
        entities: this._entities,
      };
      this._connection = new DataSource(options);

      this._loggerService.system(`Typeorm connector has been started on ${''}.`, {
        tag: 'Connection',
        scope: 'Core',
        namespace: 'TypeormConnector',
      });
    } catch (e) {
      throw e;
    }
  }

  public async stop(): Promise<void> {
    this._config = undefined;
    this._connection = undefined;
    this._emitter.removeAllListeners();
  }

  public emit<T>(event: NTypeormConnector.Events, data?: Voidable<T>): void {
    this._emitter.emit(event, data);
  }

  public on(event: NTypeormConnector.Events, listener: () => void): void {
    this._emitter.on(event, listener);
  }

  public get connection(): Typeorm.DataSource {
    if (!this._connection) {
      throw new Error('Connection is not set');
    }

    return this._connection;
  }
}
