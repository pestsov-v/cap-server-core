import { Packages } from '@Packages';
import { CoreSymbols } from '@CoreSymbols';
const { injectable, inject } = Packages.inversify;
import { AbstractService } from './abstract.service';

import {
  IDiscoveryService,
  ILocalizationService,
  ILoggerService,
  NLocalizationService,
} from '@Core/Types';

@injectable()
export class LocalizationService extends AbstractService implements ILocalizationService {
  protected readonly _SERVICE_NAME = LocalizationService.name;
  private _config: NLocalizationService.Config | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService
  ) {
    super();
  }

  private _setConfig() {
    this._config = {
      supportedLanguages: this._discoveryService.getArray<string>(
        'services:localization:supportedLanguages',
        ['en']
      ),
      defaultLanguages: this._discoveryService.getString(
        'services:localization:defaultLanguages',
        'en'
      ),
    };
  }

  public async init(): Promise<boolean> {
    this._setConfig();

    if (!this._config) {
      throw new Error('Config not set');
    }

    return true;
  }

  public async destroy() {}
}
