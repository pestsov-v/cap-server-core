import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { nconf } = Packages.nconf;
const { os } = Packages.os;
const { path } = Packages.path;
const { fse, fsp } = Packages.fs;
const { dotenv } = Packages.dotenv;

import { AbstractService } from './abstract.service';

import { Nconf } from '@Packages/Types';
import { IDiscoveryService, NDiscoveryService } from '@Core/Types';

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
    if (!this._nconf) throw this._nconfNotInitialize();

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

  public async destroy(): Promise<void> {
    if (!this._nconf) return;

    this._nconf.reset();
    this._nconf = undefined;
    this._schema = undefined;
  }

  public getMandatory<T>(name: string): T {
    const variable = this._get<T>(name);
    if (typeof variable === 'undefined' || variable === '') {
      throw new Error(`Variable "${name}" not found`);
    }

    return variable;
  }

  public getString(name: string, def: string): string {
    const variable = this._get<unknown>(name, def);
    if (typeof variable !== 'string') {
      try {
        return String(variable);
      } catch (_) {
        return def;
      }
    }
    return variable;
  }

  public getNumber(name: string, def: number): number {
    const variable = this._get<unknown>(name, def);

    if (typeof variable !== 'number') {
      try {
        return Number(variable);
      } catch (_) {
        return def;
      }
    }
    return variable;
  }

  public getBoolean(name: string, def: boolean): boolean {
    const variable = this._get<unknown>(name, def);
    if (variable !== false && variable !== true) {
      return def;
    }
    return variable;
  }

  public getArray<T>(name: string, def: Array<T>): Array<T> {
    const variable = this._get<Array<T>>(name, def);

    if (typeof variable !== 'object') {
      try {
        return Array(variable);
      } catch {
        return def;
      }
    }
    return variable;
  }

  private _get<T extends NDiscoveryService.EnvType = NDiscoveryService.EnvType>(
    name: string,
    defaultValue?: T
  ): T {
    if (!this._isStarted) throw this.notStartedError();
    if (!this._nconf) throw this._nconfNotInitialize();

    const value = this._nconf.get(name);
    return typeof value === 'undefined' ? defaultValue : value;
  }

  private _nconfNotInitialize(): Error {
    return new Error('Nconf provider is not initialize');
  }

  public async getCertificateBuffer(path: string): Promise<Buffer> {
    try {
      return this._getEnvBuffer(path);
    } catch (e) {
      throw e;
    }
  }

  public async getCertificateString(path: string): Promise<string> {
    try {
      const buffer = await this._getEnvBuffer(path);
      return buffer.toString('utf-8');
    } catch (e) {
      throw e;
    }
  }

  private async _getEnvBuffer(path: string): Promise<Buffer> {
    const variable = this._get<string>(path);
    if (!variable) {
      throw new Error(`Could not found certificate in path "${path}"`);
    }
    try {
      return await fsp.readFile(variable);
    } catch (e) {
      throw e;
    }
  }

  public getSchemaMandatory<T>(name: string): T {
    return this.getMandatory<T>(`schema:${name}`);
  }

  public getSchemaString(name: string, def: string): string {
    return this.getString(`schema:${name}`, def);
  }

  public getSchemaNumber(name: string, def: number): number {
    return this.getNumber(`schema:${name}`, def);
  }

  public getSchemaBoolean(name: string, def: boolean): boolean {
    return this.getBoolean(`schema:${name}`, def);
  }

  public getSchemaArray<T>(name: string, def: Array<T>): Array<T> {
    return this.getArray<T>(`schema:${name}`, def);
  }

  public async getSchemaBuffer(path: string): Promise<Buffer> {
    return this._getEnvBuffer(`schema:${path}`);
  }
}
