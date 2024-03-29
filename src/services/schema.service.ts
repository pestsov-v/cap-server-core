import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;

import { MetadataKeys as MK, ServerSchemeLoader } from '@chaminjector/typescheme';

import { CoreSymbols } from '@CoreSymbols';
import { container } from '../ioc/core.ioc';
import { MetadataKeys } from '@common';
import { AbstractService } from './abstract.service';

import {
  IDiscoveryService,
  ILoggerService,
  IMongodbConnector,
  ISchemaLoader,
  ISchemaService,
  ISpecificationLoader,
  ITypeormConnector,
  NAbstractService,
  NSchemaLoader,
  NSchemaService,
  NSpecificationLoader,
} from '@Core/Types';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected readonly _SERVICE_NAME: NSchemaService.ServiceName = 'SchemaService';
  private _config: NSchemaService.Config | undefined;
  private _wsListenersStorage: NSchemaLoader.Services | undefined;
  private _specifications: NSpecificationLoader.Services | undefined;
  private _schema: NSchemaLoader.Services | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.MongodbConnector)
    private readonly _mongodbConnector: IMongodbConnector,
    @inject(CoreSymbols.TypeormConnector)
    private readonly _typeormConnector: ITypeormConnector
  ) {
    super();
  }

  public get specifications(): NSpecificationLoader.Services {
    if (!this._specifications) {
      throw new Error('Specification storage is empty');
    }

    return this._specifications;
  }

  public get wsListeners(): NSchemaLoader.Services {
    if (!this._wsListenersStorage) {
      throw new Error('Ws listeners not set');
    }

    return this._wsListenersStorage;
  }

  public get schema(): NSchemaLoader.Services {
    if (!this._schema) {
      throw new Error('Collection schema not initialize or empty.');
    }

    return this._schema;
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
      this._loggerService.error(e, {
        namespace: this._SERVICE_NAME,
        scope: 'Core',
        tag: 'Init',
        errorType: 'FATAL',
      });
      return false;
    } finally {
      this._emitter.emit(`services:${this._SERVICE_NAME}:schemas-init`);
    }
  }

  private _setConfig(): void {
    this._config = {
      schemaPath: this._discoveryService.getString(
        'services.schema.schema-path',
        process.cwd() + '/src/server.ts'
      ),
      specificationEnable: this._discoveryService.getBoolean(
        'services.specification.enable',
        false
      ),
    };
  }

  public on(event: NSchemaService.Events, listener: NAbstractService.Listener): void {
    this._emitter.on(event, listener);
  }

  private async _runWorker(): Promise<void> {
    if (!this._config) {
      throw new Error('Config not set');
    }

    const { specificationEnable } = this._config;
    const schemaLoader = container.get<ISchemaLoader>(CoreSymbols.SchemaLoader);

    const s3 = new ServerSchemeLoader();

    try {
      s3.init();
      if (specificationEnable) {
        const specLoader = container.get<ISpecificationLoader>(CoreSymbols.SpecificationLoader);
        await specLoader.init();
        Reflect.defineMetadata(MetadataKeys.SpecificationLoader, specLoader, Reflect);
        Reflect.defineMetadata(MetadataKeys.isSpecLoaderEnable, specificationEnable, Reflect);
        this._specifications = specLoader.services;
      }

      Reflect.defineMetadata(MK.SERVER_LOADER, s3, Reflect);

      await import(this._config.schemaPath);
      this._schema = s3.services;

      this._typeormConnector.on('connector:TypeormConnector:start', () => {
        this._typeormConnector.emit('connector:TypeormConnector:entities:load', s3);
      });
    } catch (e) {
      throw e;
    }
  }

  protected async destroy(): Promise<void> {
    this._config = undefined;
    this._specifications = undefined;

    Reflect.deleteMetadata(MetadataKeys.isSpecLoaderEnable, Reflect);
    Reflect.deleteMetadata(MetadataKeys.SpecificationLoader, Reflect);
    Reflect.deleteMetadata(MetadataKeys.SchemaLoader, Reflect);

    this._emitter.removeAllListeners();
  }
}
