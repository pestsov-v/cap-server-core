import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { AbstractService } from './abstract.service';
import { IDiscoveryService } from '@Core/Types';

@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
  protected readonly _SERVICE_NAME = DiscoveryService.name;

  protected async init(): Promise<boolean> {
    return true;
  }

  public async destroy(): Promise<void> {}
}
