import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { nconf } = Packages.nconf;
const { os } = Packages.os;
const { path } = Packages.path;
const { fse, fsp } = Packages.fs;
const { dotenv } = Packages.dotenv;

import { AbstractService } from './abstract.service';

import { Nconf } from '@Packages/Types';
import { IDiscoveryService } from '@Core/Types';

@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
  protected readonly _SERVICE_NAME = DiscoveryService.name;
  private _nconf: Nconf.Provider | undefined;
  private _schema: string | undefined;
  private _mode: string = 'dev';

  protected async init(): Promise<boolean> {
    this._nconf = nconf;
    this._schema = process.env.SERVER_SCHEMA;
    this._mode = process.env.MODE ?? this._mode;

    try {
      await this._setExternalConfig();
      await this._setInternalConfig();
      return true;
    } catch (e) {
      throw e;
    }
  }

  private async _setExternalConfig(): Promise<void> {
    const internalConfigPath = `${os.homedir()}/.cap_configs/schemas/${this._schema}.${this._mode}`;
    try {
      if (await fse.pathExists(internalConfigPath)) {
        console.info('The configuration of the external file is written in environment variables');
        const file = await fse.readFile(internalConfigPath, 'utf-8');
        const config = dotenv.parse(file);
        Object.keys(config).forEach((env) => {
          process.env[env] = config[env];
        });
      } else {
        console.warn(
          'The configuration of the external file is not written in environment variables'
        );
      }
    } catch (e) {
      throw e;
    }
  }

  private async _setInternalConfig(): Promise<void> {
    if (!this._nconf) {
      throw new Error('Nconf provider is not initialize');
    }

    const configsPath = process.cwd() + '/configs';

    const defaults: { [key: string]: unknown } = {};
    try {
      const files = await fsp.readdir(configsPath);
      for (const file of files) {
        const [module, mode] = file.split('.');

        if (mode !== this._mode || path.extname(file) !== '.json') return;

        const config = await fsp.readFile(`${configsPath}/${file}`, 'utf-8');
        defaults[module] = JSON.parse(config);
      }
    } catch (e) {
      throw e;
    }

    this._nconf.argv({ parseValues: true }).env({ separator: '__', parseValues: true });
    this._nconf.defaults(defaults);
  }

  public async destroy(): Promise<void> {}

  public getString(name: string, def: string): string {
    return '';
  }
  public getNumber(name: string, def: number): number {
    return 0;
  }
  public getBoolean(name: string, def: boolean): boolean {
    return true;
  }
  public getArray<T>(name: string, def: Array<T>): Array<T> {
    return [];
  }
  public getMandatory<T>(name: string): T {
    return 0 as T;
  }
}
