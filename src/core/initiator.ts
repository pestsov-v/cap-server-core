import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;

import { IInitiator, IMongodbConnector, IServiceConnector } from '@Core/Types';
import { CoreSymbols } from '@CoreSymbols';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(CoreSymbols.ServiceConnector)
    private readonly _serviceConnector: IServiceConnector,
    @inject(CoreSymbols.MongodbConnector)
    private readonly _mongodbConnector: IMongodbConnector
  ) {}

  public async start(): Promise<void> {
    await this._serviceConnector.start();
    await this._mongodbConnector.start();
  }
  public async stop(): Promise<void> {
    await this._mongodbConnector.stop();
    await this._serviceConnector.stop();
  }
}
