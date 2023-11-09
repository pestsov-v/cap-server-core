import { Packages } from '@Packages';
const { injectable, inject, Container } = Packages.inversify;
import { MetadataKeys } from '@common';

import { AbstractService } from './abstract.service';
import { IDiscoveryService, ILoggerService, ISchemaService } from '@Core/Types';
import { CoreSymbols } from '@CoreSymbols';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected readonly _SERVICE_NAME = SchemaService.name;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected _loggerService: ILoggerService
  ) {
    super();
  }

  protected async init() {
    Reflect.defineMetadata(MetadataKeys.SchemaContainer, new Container(), Reflect);

    import('../../schemas');

    setTimeout(() => {
      console.log(Reflect.getMetadataKeys(Reflect));
    });
    return true;
  }
  protected async destroy(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
