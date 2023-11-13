import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;

import { CoreSymbols } from '@CoreSymbols';
import { IInitiator, IMongodbConnector, IServiceConnector, ITypeormConnector } from '@Core/Types';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(CoreSymbols.ServiceConnector)
    private readonly _serviceConnector: IServiceConnector,
    @inject(CoreSymbols.MongodbConnector)
    private readonly _mongodbConnector: IMongodbConnector,
    @inject(CoreSymbols.TypeormConnector)
    private readonly _typeormConnector: ITypeormConnector
  ) {}

  public async start(): Promise<void> {
    await this._serviceConnector.start();
    await this._mongodbConnector.start();
    await this._typeormConnector.start();
  }
  public async stop(): Promise<void> {
    await this._typeormConnector.stop();
    await this._mongodbConnector.stop();
    await this._serviceConnector.stop();
  }
}
