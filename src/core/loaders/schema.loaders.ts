import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { ISchemaLoader, NSchemaLoader } from '@Core/Types';

@injectable()
export class SchemaLoader implements ISchemaLoader {
  private _services: Map<string, NSchemaLoader.Domains> | undefined;
  private _domains: NSchemaLoader.Domains | undefined;

  public async init(): Promise<void> {
    this._domains = new Map<string, NSchemaLoader.DomainStorage>();
    this._services = new Map<string, NSchemaLoader.Domains>();
  }

  public get services() {
    return this._domains;
  }

  private get throwDomainsError() {
    return new Error('Domains not initialize');
  }

  public async destroy(): Promise<void> {
    this._domains = undefined;
    this._services = undefined;
  }

  public applyDomainToService(service: string, domain: string): void {
    if (!this._services || !this._domains) throw this.throwDomainsError;

    const sStorage = this._services.get(service);
    if (!sStorage) {
      this._services.set(service, new Map<string, NSchemaLoader.DomainStorage>());
      this.applyDomainToService(service, domain);
      return;
    }

    const dStorage = this._domains.get(domain);
    if (!dStorage) {
      throw new Error(`Domain ${domain} not found`);
    }

    sStorage.set(domain, dStorage);
  }

  public setRoute<T extends string>(domain: string, details: NSchemaLoader.Route<T>): void {
    if (!this._domains) throw this.throwDomainsError;

    const storage = this._domains.get(domain);
    if (!storage) {
      this._domains.set(domain, {
        routes: new Map<string, NSchemaLoader.Route>(),
      });
      this.setRoute<T>(domain, details);
      return;
    }

    if (!storage.routes) {
      storage.routes = new Map<string, NSchemaLoader.Route>();
    }

    const name = details.path + '{{' + details.method.toUpperCase() + '}}';
    const route = storage.routes.get(name);
    if (route) {
      throw new Error(`Route ${name} already exists`);
    } else {
      storage.routes.set(name, details);
    }
  }
}
