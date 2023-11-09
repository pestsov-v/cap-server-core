import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { fork } = Packages.child_process;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from '../abstract.service';

import {
  IAbstractFactory,
  IDiscoveryService,
  ILoggerService,
  ISchemaLoader,
  ISchemaService,
  NAbstractService,
  NSchemaService,
  NSchemaWorker,
} from '@Core/Types';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected readonly _SERVICE_NAME: NSchemaService.ServiceName = 'SchemaService';
  private _config: NSchemaService.Config | undefined;
  private _SCHEMAS: any | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.SchemaLoader)
    protected readonly _schemaLoader: ISchemaLoader,
    @inject(CoreSymbols.FrameworkFactory)
    private readonly _frameworkFactory: IAbstractFactory
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
      this._loggerService.error(e);
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

    const path = process.cwd() + '/src/core/services/schema-service/schema.worker';
    const worker = fork(path);
    const payload: NSchemaWorker.ParentPayload = {
      path: this._config.schemaPath,
    };

    worker.send(payload);
    worker.on('message', async (data: NSchemaWorker.WorkerResult) => {
      switch (data.status) {
        case 'OK':
          this._emitter.emit(`services:${this._SERVICE_NAME}:schemas-load`);
          this._SCHEMAS = data.schemas;
          await this._frameworkFactory.run(this._SCHEMAS);
          break;
        case 'FAIL':
          this._emitter.emit(`services:${this._SERVICE_NAME}:schemas-error`);
          this._SCHEMAS = undefined;
          break;
        default:
          break;
      }
    });
  }

  protected async destroy(): Promise<void> {
    this._SCHEMAS = undefined;
    this._config = undefined;
    this._emitter.removeAllListeners();
  }
}
