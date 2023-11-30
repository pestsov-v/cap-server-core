import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { container } from '../ioc/core.ioc';
import { MetadataKeys } from '@common';
import { AbstractService } from './abstract.service';

import {
  IAbstractFactory,
  IBaseOperationAgent,
  IDiscoveryService,
  IFunctionalityAgent,
  IIntegrationAgent,
  ILocalizationService,
  ILoggerService,
  IMongodbConnector,
  IMongodbProvider,
  ISchemaAgent,
  ISchemaLoader,
  ISchemaService,
  ISessionService,
  ISpecificationLoader,
  ITypeormConnector,
  ITypeormProvider,
  NAbstractFrameworkAdapter,
  NAbstractService,
  NMongodbProvider,
  NSchemaLoader,
  NSchemaService,
  NSpecificationLoader,
  NTypeormConnector,
} from '@Core/Types';
import { Typeorm } from '@Packages/Types';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected readonly _SERVICE_NAME: NSchemaService.ServiceName = 'SchemaService';
  private _config: NSchemaService.Config | undefined;
  private _wsListenersStorage: NSchemaLoader.Services | undefined;
  private _specifications: NSpecificationLoader.Services | undefined;

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
      schemaPath: this._discoveryService.getMandatory<string>('services:schema:schema-path'),
      specificationEnable: this._discoveryService.getBoolean(
        'services:specification:enable',
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

    try {
      await schemaLoader.init();
      if (specificationEnable) {
        const specLoader = container.get<ISpecificationLoader>(CoreSymbols.SpecificationLoader);
        await specLoader.init();
        Reflect.defineMetadata(MetadataKeys.SpecificationLoader, specLoader, Reflect);
        Reflect.defineMetadata(MetadataKeys.isSpecLoaderEnable, specificationEnable, Reflect);
        this._specifications = specLoader.services;
      }

      Reflect.defineMetadata(MetadataKeys.SchemaLoader, schemaLoader, Reflect);

      await import(this._config.schemaPath);

      await this._frameworkFactory.run(schemaLoader.services);

      this._typeormConnector.on('connector:TypeormConnector:start', () => {
        this._typeormConnector.emit(
          'connector:TypeormConnector:entities:load',
          loader.typeormSchemas
        );
      });

      this._wsListenersStorage = schemaLoader.wsListeners;

      this._localizationService.loadDictionaries(schemaLoader.dictionaries);
    } catch (e) {
      throw e;
    }
  }

  protected async destroy(): Promise<void> {
    this._config = undefined;
    await this._frameworkFactory.stand();

    this._emitter.removeAllListeners();
  }
}
