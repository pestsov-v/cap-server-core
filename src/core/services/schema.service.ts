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
  ILoggerService,
  IMongodbConnector,
  IMongodbProvider,
  ISchemaAgent,
  ISchemaLoader,
  ISchemaService,
  ITypeormConnector,
  ITypeormProvider,
  NAbstractFrameworkAdapter,
  NAbstractService,
  NMongodbProvider,
  NSchemaService,
  NTypeormConnector,
} from '@Core/Types';
import { Typeorm } from '@Packages/Types';

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
    private readonly _mongodbConnector: IMongodbConnector,
    @inject(CoreSymbols.TypeormConnector)
    private readonly _typeormConnector: ITypeormConnector
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
      this._typeormConnector.on('connector:TypeormConnector:start', () => {
        const entities: Typeorm.EntitySchema<unknown>[] = [];

        loader.typeormSchemas.forEach((schema) => {
          const agents: NAbstractFrameworkAdapter.Agents = {
            functionalityAgent: container.get<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent),
            schemaAgent: container.get<ISchemaAgent>(CoreSymbols.SchemaAgent),
            baseAgent: container.get<IBaseOperationAgent>(CoreSymbols.BaseOperationAgent),
          };

          entities.push(schema.getSchema(agents));
        });

        this._typeormConnector.emit('connector:TypeormConnector:entities:load', entities);
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
