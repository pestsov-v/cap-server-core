import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;

import { IInitiator, IServiceConnector } from '@Core/Types';
import { CoreSymbols } from '@CoreSymbols';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(CoreSymbols.ServiceConnector)
    private _serviceConnector: IServiceConnector
  ) {}

  public async start(): Promise<void> {
    await this._serviceConnector.start();
  }
  public async stop(): Promise<void> {
    await this._serviceConnector.stop();
  }
}
