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

  public serialiseServices(): string {
    if (!this._services) throw this.throwDomainsError();

    const services: NSchemaLoader.SerializeServices = {};
    for (const [sName, domains] of this._services) {
      services[sName] = {};
      for (const [dName, storage] of domains) {
        if (storage.routes || storage.helpers || storage.controllers) {
          services[sName][dName] = {};
          if (storage.routes) {
            services[sName][dName]['routes'] = {};
            for (const [rName, route] of storage.routes) {
              services[sName][dName]['routes'][rName] = route;
            }
          } else {
            storage.routes = undefined;
          }
          if (storage.controllers) {
            services[sName][dName]['controllers'] = {};
            for (const [cName, controller] of storage.controllers) {
              services[sName][dName]['controllers'][cName] = controller.toString();
            }
          } else {
            storage.controllers = undefined;
          }
          if (storage.helpers) {
            services[sName][dName]['helpers'] = {};
            for (const [hName, helpers] of storage.helpers) {
              services[sName][dName]['helpers'][hName] = helpers.toString();
            }
          } else {
            storage.helpers = undefined;
          }
        }
      }
    }

    return JSON.stringify(services);
  }

  public deserializeServices(payload: string): Map<string, NSchemaLoader.Domains> {
    const services: Map<string, NSchemaLoader.Domains> = new Map<string, NSchemaLoader.Domains>();
    try {
      const data = JSON.parse(payload) as NSchemaLoader.SerializeServices;
      for (const sName in data) {
        services.set(sName, new Map<string, NSchemaLoader.DomainStorage>());
        const domains = new Map<string, NSchemaLoader.DomainStorage>();
        for (const dName in data[sName]) {
          const domain = data[sName][dName];
          const routes = new Map<string, NSchemaLoader.Route>();
          if (domain.routes) {
            for (const rName in domain.routes) {
              const route = domain.routes[rName];
              routes.set(rName, route);
            }
          }

          const controllers = new Map<string, NAbstractFrameworkAdapter.Handler>();
          if (domain.controllers) {
            for (const cName in domain.controllers) {
              const controller = domain.controllers[cName];
              controllers.set(cName, new Function(controller) as NAbstractFrameworkAdapter.Handler);
            }
          }

          const helpers = new Map<string, (...args: any[]) => any>();
          if (domain.helpers) {
            for (const hName in domain.helpers) {
              const helper = domain.helpers[hName];
              controllers.set(hName, new Function(helper) as (...args: any[]) => any);
            }
          }

          domains.set(dName, {
            routes: routes,
            controllers: controllers,
            helpers: helpers,
          });
        }

        services.set(sName, domains);
      }

      return services;
    } catch (e) {
      throw e;
    }
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
