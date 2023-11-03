import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { AbstractService } from './abstract.service';

import { ILoggerService } from '@Core/Types';

@injectable()
export class LoggerService extends AbstractService implements ILoggerService {
  protected readonly _SERVICE_NAME = LoggerService.name;

  public async init(): Promise<boolean> {
    return true;
  }

  public async destroy(): Promise<void> {}
}
