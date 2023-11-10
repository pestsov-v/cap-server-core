import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import {
  IContextService,
  ISchemaLoader,
  ISchemaProvider,
  NSchemaLoader,
  NSchemaProvider,
} from '@Core/Types';

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
  ): NSchemaLoader.HelperHandler {
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
}
