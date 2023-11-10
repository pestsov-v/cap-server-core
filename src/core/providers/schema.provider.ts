import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import { IContextService, ISchemaProvider, NSchemaLoader, NSchemaProvider } from '@Core/Types';
import { AnyFunction } from '@Utility/Types';

@injectable()
export class SchemaProvider implements ISchemaProvider {
  constructor(
    @inject(CoreSymbols.ContextService)
    private readonly _contextService: IContextService
  ) {}

  public get routines(): NSchemaProvider.SchemaRoutines {
    return {
      getHelpers: (services: NSchemaLoader.Services, domain: string) => {
        return this._getHelpers(services, domain);
      },
      getHelper: (services: NSchemaLoader.Services, domain: string, helper: string) => {
        return this._getHelper(services, domain, helper);
      },
      getMongoRepository: <T extends AnyFunction = AnyFunction>(
        services: NSchemaLoader.Services
      ): Map<string, T> => {
        return this._getMongoRepository<T>(services);
      },
    };
  }

  private get _getService() {
    return this._contextService.store.service;
  }

  private _getHelpers(services: NSchemaLoader.Services, domain: string): NSchemaProvider.Helpers {
    const service = services.get(this._getService);
    if (!service) {
      throw new Error('Service not found');
    }

    const storage = service.get(domain);
    if (!storage) {
      throw new Error('Domain not found');
    }

    if (storage.helpers) {
      const helpers = storage.helpers;
      if (!helpers) {
        throw new Error('Helpers not found');
      }
      return helpers;
    } else {
      throw new Error('Helpers not found');
    }
  }

  private _getHelper(
    services: NSchemaLoader.Services,
    domain: string,
    helper: string
  ): NSchemaLoader.HelperHandler<AnyFunction> {
    const helpers = this._getHelpers(services, domain);
    if (!helpers) {
      throw new Error('Helpers not found');
    }
    const handler = helpers.get(helper);
    if (!handler) {
      throw new Error('Helper not found');
    }

    return handler;
  }

  private _getMongoRepository<T extends AnyFunction = AnyFunction>(
    services: NSchemaLoader.Services
  ): Map<string, T> {
    const store = this._contextService.store;

    const service = services.get(store.service);
    if (!service) {
      throw new Error('Service not found');
    }
    const domain = service.get(store.domain);
    if (!domain) {
      throw new Error('Domain not found');
    }

    if (!domain.mongoRepoHandlers) {
      throw new Error('Mongo repository handlers not found');
    }

    return domain.mongoRepoHandlers;
  }

  private _getMongoRepositoryHandler<T extends AnyFunction = AnyFunction>(
    services: NSchemaLoader.Services,
    handler: string
  ): NSchemaLoader.HelperHandler<T> {
    const mongoRepoHandlers = this._getMongoRepository<T>(services);
    if (!mongoRepoHandlers) {
      throw new Error('Mongo repository handlers not found');
    }

    const fn = mongoRepoHandlers.get(handler);
    if (!fn) {
      throw new Error('Mongo repository handler not found');
    }

    return fn;
  }
}
