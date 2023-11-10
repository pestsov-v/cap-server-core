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
    private readonly _contextService: IContextService,
    @inject(CoreSymbols.SchemaLoader)
    private readonly _schemaLoader: ISchemaLoader
  ) {}

  public get routines(): NSchemaProvider.SchemaRoutines {
    return {
      getHelpers: (domain: string) => {
        return this._getHelpers(domain);
      },
      getHelper: (domain: string, helper: string) => {
        return this._getHelper(domain, helper);
      },
    };
  }

  private get _getService() {
    return this._contextService.store.service;
  }

  private _getHelpers(domain: string): NSchemaProvider.Helpers {
    const service = this._schemaLoader.services.get(this._getService);
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

  private _getHelper(domain: string, helper: string): NSchemaLoader.HelperHandler {
    const helpers = this._getHelpers(domain);
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
