import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { container } from '../ioc/core.ioc';

import { IContextService, IFunctionalityAgent, ISchemaProvider } from '@Core/Types';
import { AnyFunction, FnObject, UnknownObject } from '@Utility/Types';

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
        const mongoose = container.get<IFunctionalityAgent>(
          CoreSymbols.FunctionalityAgent
        ).mongoose;

        return handler ? handler(mongoose, ...args) : undefined;
      }
    }

    return new Repository<T>(mongoRepository) as T;
  }

  public getMongoRepository<T extends FnObject = FnObject>(): T {
    return this.getAnotherMongoRepository<T>(this._contextService.store.domain);
  }

  public getAnotherValidator<T>(name: string): T {
    const store = this._contextService.store;

    const service = store.schema.get(store.service);
    if (!service) {
      throw new Error('Service not found');
    }
    const domain = service.get(name);
    if (!domain) {
      throw new Error('Domain not found');
    }

    const validators = domain.validators;
    if (!validators) {
      throw new Error('Validator not found');
    }

    class Validator<T> {
      private readonly _handlers: Map<string, AnyFunction>;
      constructor(handlers: Map<string, AnyFunction>) {
        this._handlers = handlers;

        for (const [name] of this._handlers) {
          Object.defineProperty(this, name, {
            value: (...args: any[]) => this._runMethod(name, ...args),
            writable: true,
            configurable: true,
          });
        }
      }

      private _runMethod(method: string, ...args: any[]): any {
        const handler = this._handlers.get(method);
        if (handler) {
          const validator = container.get<IFunctionalityAgent>(
            CoreSymbols.FunctionalityAgent
          ).validator;
          return handler(validator, ...args);
        }
      }
    }

    return new Validator<T>(validators) as T;
  }

  public getValidator<T extends UnknownObject>(): T {
    return this.getAnotherValidator<T>(this._contextService.store.domain);
  }
}
