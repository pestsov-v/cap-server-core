import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { ISchemaLoader, NAbstractFrameworkAdapter, NSchemaLoader } from '@Core/Types';

@injectable()
export class SchemaLoader implements ISchemaLoader {
  private _services: Map<string, NSchemaLoader.Domains> | undefined;
  private _domains: NSchemaLoader.Domains | undefined;

  public async init(): Promise<void> {
    this._domains = new Map<string, NSchemaLoader.DomainStorage>();
    this._services = new Map<string, NSchemaLoader.Domains>();
  }

  public get services(): NSchemaLoader.Services {
    if (!this._services) throw this.throwDomainsError();

    return this._services;
  }

  private throwDomainsError() {
    return new Error('Domains not initialize');
  }

  public async destroy(): Promise<void> {
    this._domains = undefined;
    this._services = undefined;
  }

  public applyDomainToService(service: string, domain: string): void {
    if (!this._services || !this._domains) throw this.throwDomainsError();

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

  public setController<T extends string>(domain: string, details: NSchemaLoader.Controller<T>) {
    if (!this._domains) throw this.throwDomainsError();

    const storage = this._domains.get(domain);
    if (!storage) {
      this._setDomain(domain);
      this.setController<T>(domain, details);
      return;
    }
    if (!storage.controllers) {
      storage.controllers = new Map<string, NAbstractFrameworkAdapter.Handler>();
    }

    storage.controllers.set(details.name, details.handler);
  }

  public setHelper(domain: string, details: NSchemaLoader.Helper): void {
    if (!this._domains) throw this.throwDomainsError();

    const storage = this._domains.get(domain);
    if (!storage) {
      this._setDomain(domain);
      this.setHelper(domain, details);
      return;
    }
    if (!storage.helpers) {
      storage.helpers = new Map<string, (...args: any[]) => any>();
    }

    storage.helpers.set(details.name, details.handler);
  }

  public setRoute<T extends string>(domain: string, details: NSchemaLoader.Route<T>): void {
    if (!this._domains) throw this.throwDomainsError();

    const storage = this._domains.get(domain);
    if (!storage) {
      this._setDomain(domain);
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

  private _setDomain(domain: string): void {
    if (!this._domains) throw this.throwDomainsError();

    this._domains.set(domain, {
      routes: new Map<string, NSchemaLoader.Route>(),
      controllers: new Map<string, NAbstractFrameworkAdapter.Handler>(),
      helpers: new Map<string, (...args: any[]) => any>(),
    });
  }
}
