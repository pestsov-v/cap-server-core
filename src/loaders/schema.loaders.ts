import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { EntitySchema } = Packages.typeorm;

import {
  Typeorm,
  AnyFunction,
  HttpMethod,
  UnknownObject,
  ControllerStructure,
  RouterStructure,
  IBaseOperationAgent,
  IFunctionalityAgent,
  IIntegrationAgent,
  ISchemaAgent,
  ISchemaLoader,
  NAbstractHttpAdapter,
  NMongodbProvider,
  NSchemaLoader,
  NTypeormProvider,
  DictionaryStructure,
  ExtendedRecordObject,
  NLocalizationService,
  EmitterStructure,
  WsListenerStructure,
  ValidateStructure,
  ValidateRoute,
} from '@Core/Types';
import { container } from '../ioc/core.ioc';
import { CoreSymbols } from '@CoreSymbols';

@injectable()
export class SchemaLoader implements ISchemaLoader {
  private _SERVICES: Map<string, NSchemaLoader.Domains> | undefined;
  private _DOMAINS: NSchemaLoader.Domains | undefined;

  public async init(): Promise<void> {
    this._DOMAINS = new Map<string, NSchemaLoader.DomainStorage>();
    this._SERVICES = new Map<string, NSchemaLoader.Domains>();
  }

  private get _domains(): NSchemaLoader.Domains {
    if (!this._DOMAINS) {
      throw new Error('Domains map not initialize');
    }

    return this._DOMAINS;
  }

  public get services(): NSchemaLoader.Services {
    if (!this._SERVICES) {
      throw new Error('Services map not initialize');
    }

    return this._SERVICES;
  }

  public async destroy(): Promise<void> {
    this._DOMAINS = undefined;
    this._SERVICES = undefined;
  }

  public get typeormSchemas(): NSchemaLoader.TypeormEntities {
    const entities: NSchemaLoader.TypeormEntities = new Map<
      string,
      Typeorm.EntitySchema<unknown>
    >();
    this.services.forEach((domains) => {
      domains.forEach((storage) => {
        if (storage.typeormSchema && storage.typeormModel) {
          const agents: NAbstractHttpAdapter.Agents = {
            functionalityAgent: container.get<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent),
            schemaAgent: container.get<ISchemaAgent>(CoreSymbols.SchemaAgent),
            baseAgent: container.get<IBaseOperationAgent>(CoreSymbols.BaseOperationAgent),
            integrationAgent: container.get<IIntegrationAgent>(CoreSymbols.IntegrationAgent),
          };

          const entity = new EntitySchema<unknown>(storage.typeormSchema(agents));
          entities.set(storage.typeormModel, entity);
        }
      });
    });

    return entities;
  }

  public applyDomainToService(service: string, domain: string): void {
    const sStorage = this.services.get(service);
    if (!sStorage) {
      this.services.set(service, new Map<string, NSchemaLoader.DomainStorage>());
      this.applyDomainToService(service, domain);
      return;
    }

    const dStorage = this._domains.get(domain);
    if (!dStorage) {
      throw new Error(`Domain ${domain} not found`);
    }

    sStorage.set(domain, dStorage);
  }

  public setController(domain: string, structure: ControllerStructure<any>): void {
    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setController(domain, structure);
      return;
    }

    for (const controller in structure) {
      storage.controllers.set(controller, structure[controller]);
    }
  }

  public setEmitter(domain: string, emitter: EmitterStructure<string>): void {
    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setEmitter(domain, emitter);
      return;
    }

    for (const event in emitter) {
      const description = emitter[event];
      storage.emitter.set(event, {
        domain: description.domain,
        event: event,
        service: description.service,
        isPrivateUser: description.isPrivateUser,
        isPrivateOrganization: description.isPrivateOrganization,
      });
    }
  }

  public setWsListener(domain: string, structure: WsListenerStructure<string>): void {
    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setWsListener(domain, structure);
      return;
    }

    for (const listener in structure) {
      storage.wsListeners.set(listener, structure[listener]);
    }
  }

  public setHelper(domain: string, details: NSchemaLoader.Helper): void {
    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setHelper(domain, details);
      return;
    }

    storage.helpers.set(details.name, details.handler);
  }

  public setValidator<T>(
    domain: string,
    structure: ValidateStructure<Record<string, ValidateRoute>>
  ): void {
    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setValidator(domain, structure);
      return;
    }

    for (const listener in structure) {
      storage.validators.set(listener, structure[listener]);
    }
  }

  setMongoRepository<
    T extends string = string,
    H extends string = string,
    A extends UnknownObject = UnknownObject,
    R = void
  >(domain: string, model: string, details: NSchemaLoader.MongoRepoHandler<T, H, A, R>) {
    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setMongoRepository<T>(domain, model, details);
      return;
    }
    if (!storage.mongoRepoHandlers) {
      storage.mongoRepoHandlers = new Map<string, NAbstractHttpAdapter.Handler>();
    }

    storage.mongoRepoHandlers.set(details.name, details.handler);
  }

  public setRoute(domain: string, structure: RouterStructure<string, string>): void {
    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setRoute(domain, structure);
      return;
    }

    for (const str in structure) {
      const routes = structure[str];
      for (const method in routes) {
        const description = routes[method as HttpMethod];
        if (description) {
          const name = str + '{{' + method.toUpperCase() + '}}';
          const route = storage.routes.get(name);
          if (route) {
            throw new Error('`Route ${name} already exists');
          } else {
            storage.routes.set(name, {
              path: str,
              method: method as HttpMethod,
              params: description.params,
              handler: description.handler,
              isPrivateUser: description.isPrivateUser,
              isPrivateOrganization: description.isPrivateOrganization,
            });
          }
        }
      }
    }
  }

  public setMongoSchema<T>(domain: string, details: NMongodbProvider.SchemaInfo<T>): void {
    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setMongoSchema<T>(domain, details);
      return;
    }

    if (!storage.mongoSchema) {
      storage.mongoSchema = details.getSchema;
      storage.mongoModel = details.model;
    } else {
      throw new Error(`Mongo schema for domain ${domain} already exists`);
    }
  }

  public setTypeormSchema<T>(domain: string, details: NTypeormProvider.SchemaInfo<T>): void {
    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setTypeormSchema<T>(domain, details);
      return;
    }

    if (!storage.mongoSchema) {
      storage.typeormSchema = details.getSchema;
      storage.typeormModel = details.model;
    } else {
      throw new Error(`Mongo schema for domain ${domain} already exists`);
    }
  }

  public setTypeormRepository<T extends string = string>(
    domain: string,
    model: string,
    details: Record<string, AnyFunction>
  ): void {
    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setTypeormRepository<T>(domain, model, details);
      return;
    }

    for (const name in details) {
      const handler = details[name];
      storage.typeormRepoHandlers.set(name, handler);
    }
  }

  public setDictionaries(
    domain: string,
    dictionaries:
      | DictionaryStructure<string, ExtendedRecordObject>
      | DictionaryStructure<string, ExtendedRecordObject>[]
  ): void {
    const storage = this._domains.get(domain);
    if (!storage) {
      this.setDomain(domain);
      this.setDictionaries(domain, dictionaries);
      return;
    }

    if (Array.isArray(dictionaries)) {
      dictionaries.forEach((dict) => {
        storage.dictionaries.set(dict.language, dict.dictionary);
      });
    } else {
      storage.dictionaries.set(dictionaries.language, dictionaries.dictionary);
    }
  }

  public setDomain(domain: string): void {
    this._domains.set(domain, {
      routes: new Map<string, NSchemaLoader.Route>(),
      controllers: new Map<string, NAbstractHttpAdapter.Handler>(),
      helpers: new Map<string, AnyFunction>(),
      mongoRepoHandlers: new Map<string, AnyFunction>(),
      validators: new Map<string, any>(),
      typeormRepoHandlers: new Map<string, AnyFunction>(),
      dictionaries: new Map<string, NLocalizationService.Dictionary>(),
      emitter: new Map<string, NSchemaLoader.Emitter>(),
      wsListeners: new Map<string, AnyFunction>(),
    });
  }
}
