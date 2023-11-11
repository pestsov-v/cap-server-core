import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import { IContextService, ISchemaProvider } from '@Core/Types';
import { AnyFunction, FnObject } from '@Utility/Types';

@injectable()
export class SchemaProvider implements ISchemaProvider {
  constructor(
    @inject(CoreSymbols.ContextService)
    private readonly _contextService: IContextService
  ) {}

  public getAnotherMongoRepository<T>(name: string): T {
    const store = this._contextService.store;

    const service = store.schema.get(store.service);
    if (!service) {
      throw new Error('Service not found');
    }
    const domain = service.get(name);
    if (!domain) {
      throw new Error('Domain not found');
    }

    const mongoRepository = domain.mongoRepoHandlers;
    if (!mongoRepository) {
      throw new Error('Mongo repository not found');
    }

    class Repository<T> {
      private readonly _handlers: Map<string, AnyFunction>;
      constructor(handlers: Map<string, AnyFunction>) {
        this._handlers = handlers;

        for (const [name] of this._handlers) {
          Object.defineProperty(this, name, {
            value: async (...args: any[]) => this._runMethod(name, ...args),
            writable: true,
            configurable: true,
          });
        }
      }

      private _runMethod(method: string, ...args: any[]): any {
        const handler = this._handlers.get(method);
        return handler ? handler(...args) : undefined;
      }
    }

    return new Repository<T>(mongoRepository) as T;
  }

  public getMongoRepository<T extends FnObject = FnObject>(): T {
    return this.getAnotherMongoRepository<T>(this._contextService.store.domain);
  }
}
