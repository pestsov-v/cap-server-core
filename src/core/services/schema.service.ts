import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { container } from '../ioc/core.ioc';
import { MetadataKeys } from '@common';
import { AbstractService } from './abstract.service';

import {
  IAbstractFactory,
  IDiscoveryService,
  ILoggerService,
  IMongodbConnector,
  IMongodbProvider,
  ISchemaLoader,
  ISchemaService,
  NAbstractService,
  NSchemaService,
} from '@Core/Types';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected readonly _SERVICE_NAME: NSchemaService.ServiceName = 'SchemaService';
  private _config: NSchemaService.Config | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.SchemaLoader)
    protected readonly _schemaLoader: ISchemaLoader,
    @inject(CoreSymbols.FrameworkFactory)
    private readonly _frameworkFactory: IAbstractFactory,
    @inject(CoreSymbols.MongodbConnector)
    private readonly _mongodbConnector: IMongodbConnector
  ) {
    super();
  }

  protected async init(): Promise<boolean> {
    this._setConfig();
    this._discoveryService.on('service:DiscoveryService:reload', () => {
      this._setConfig();
    });

    if (!this._config) {
      console.log(`Config for ${this._SERVICE_NAME} not initialize`);
      return false;
    }
    try {
      await this._runWorker();

      return true;
    } catch (e) {
      this._loggerService.error(e, { scope: 'Core', tag: 'Init', errorType: 'FATAL' });
      return false;
    } finally {
      this._emitter.emit(`services:${this._SERVICE_NAME}:schemas-init`);
    }
  }

  private _setConfig(): void {
    this._config = {
      schemaPath: this._discoveryService.getMandatory<string>('services:schema:schema-path'),
    };
  }

  public on(event: NSchemaService.Events, listener: NAbstractService.Listener): void {
    this._emitter.on(event, listener);
  }

  private async _runWorker(): Promise<void> {
    if (!this._config) {
      throw new Error('Config not set');
    }
    const loader = container.get<ISchemaLoader>(CoreSymbols.SchemaLoader);
    try {
      await loader.init();
      Reflect.defineMetadata(MetadataKeys.SchemaLoader, loader, Reflect);
      await import(this._config.schemaPath);

      await this._frameworkFactory.run(loader.services);

      this._mongodbConnector.on('connector:MongoDbConnector:init', () => {
        // TODO: implement separate logic for different services

        container.get<IMongodbProvider>(CoreSymbols.MongodbProvider).setModels(loader.mongoSchemas);
      });
    } catch (e) {
      throw e;
    }
  }

  protected async destroy(): Promise<void> {
    this._config = undefined;
    this._emitter.removeAllListeners();
  }
}
