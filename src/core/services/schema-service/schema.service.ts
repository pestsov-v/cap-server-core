import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { fork } = Packages.childProcess;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from '../abstract.service';

import {
  IDiscoveryService,
  ILoggerService,
  ISchemaLoader,
  ISchemaService,
  NSchemaService,
  NSchemaWorker,
} from '@Core/Types';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected readonly _SERVICE_NAME: NSchemaService.ServiceName = 'SchemaService';
  private _config: NSchemaService.Config | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected _loggerService: ILoggerService,
    @inject(CoreSymbols.SchemaLoader)
    protected _schemaLoader: ISchemaLoader
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

    await this._runWorker();
    this._emitter.emit(`services:${this._SERVICE_NAME}:schemas-init`);

    return true;
  }

  private _setConfig(): void {
    this._config = {
      schemaPath: this._discoveryService.getMandatory<string>('services:schema:schema-path'),
    };
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
    worker.on('message', (data: NSchemaWorker.WorkerResult) => {
      switch (data.status) {
        case 'OK':
          this._emitter.emit(`services:${this._SERVICE_NAME}:schemas-load`);
          break;
        case 'FAIL':
          this._emitter.emit(`services:${this._SERVICE_NAME}:schemas-error`);
          break;
        default:
          break;
      }
    });
  }

  protected async destroy(): Promise<void> {
    this._config = undefined;
    this._emitter.removeAllListeners();
  }
}
