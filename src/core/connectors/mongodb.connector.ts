import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { mongoose } = Packages.mongoose;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractConnector } from './abstract.connector';

import { Mongoose } from '@Packages/Types';
import {
  IDiscoveryService,
  ILoggerService,
  IMongodbConnector,
  NMongodbConnector,
} from '@Core/Types';

@injectable()
export class MongodbConnector extends AbstractConnector implements IMongodbConnector {
  private _connection: Mongoose.Mongoose | undefined;
  private _config: NMongodbConnector.Config | undefined;

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
      enable: this._discoveryService.getBoolean('connectors:mongodb:enable', true),
      protocol: this._discoveryService.getString('connectors:mongodb:connect:protocol', 'mongodb'),
      host: this._discoveryService.getString('connectors:mongodb:connect:host', 'localhost'),
      port: this._discoveryService.getNumber('connectors:mongodb:connect:port', 27017),
      auth: {
        username: this._discoveryService.getString('connectors:mongodb:auth:username', ''),
        password: this._discoveryService.getString('connectors:mongodb:auth:password', ''),
      },
      database: this._discoveryService.getString('connectors:mongodb:database', 'default'),
    };
  }

  public async start(): Promise<void> {
    this._setConfig();

    if (!this._config) {
      throw new Error('Config is not set');
    }

    if (!this._config.enable) {
      this._loggerService.system('Mongodb connector is disabled', {
        tag: 'Connection',
        scope: 'Core',
        namespace: 'MongodbConnector',
      });
      return;
    }

    const { protocol, host, port } = this._config;

    // TODO: implement advanced configuration options
    const options: Mongoose.ConnectionOptions = {
      dbName: this._config.database,
    };

    try {
      const url = `${protocol}://${host}:${port}`;
      this._connection = await mongoose.connect(url, options);

      this._loggerService.system(`Mongodb connector has been started on ${url}.`, {
        tag: 'Connection',
        scope: 'Core',
        namespace: 'MongodbConnector',
      });
    } catch (e) {
      throw e;
    }
  }

  public async stop(): Promise<void> {
    if (!this._connection) return;

    try {
      await this._connection.disconnect();

      this._loggerService.system('Mongodb connector has been stopped.', {
        tag: 'Connection',
        scope: 'Core',
        namespace: 'MongodbConnector',
      });
    } catch (e) {
      throw e;
    }
  }

  public get connection(): Mongoose.Mongoose {
    if (!this._connection) {
      throw new Error('Connection is not set');
    }

    return this._connection;
  }
}
