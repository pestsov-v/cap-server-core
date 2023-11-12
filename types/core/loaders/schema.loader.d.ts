import { NAbstractFrameworkAdapter } from '../adapters';
import { NMongodbProvider, NValidatorProvider } from '../providers';
import { AnyFunction, FnObject, UnknownObject } from '@Utility/Types';

export interface ISchemaLoader {
  readonly services: NSchemaLoader.Services;
  readonly mongoSchemas: NMongodbProvider.SchemaInfo<UnknownObject>[];

  init(): Promise<void>;
  destroy(): Promise<void>;
  applyDomainToService(service: string, domain: string): void;
  setRoute<T extends string>(domain: string, route: NSchemaLoader.Route<T>): void;
  setController<T extends string>(domain: string, controller: NSchemaLoader.Controller<T>): void;
  setValidator<T>(domain, validator: NSchemaLoader.Validator<T>): void;
  setMongoRepository<
    D extends string = string,
    T extends string = string,
    H extends string = string,
    A extends UnknownObject = UnknownObject,
    R = void
  >(
    domain: string,
    model: string,
    handler: NSchemaLoader.MongoRepoHandler<T, H, A, R>
  ): void;
  setHelper(domain: string, helper: NSchemaLoader.Helper): void;
  setMongoSchema<T>(domain: string, details: NMongodbProvider.SchemaInfo<T>): void;
}

export namespace NSchemaLoader {
  export type Route<T extends string = string> = {
    path: string;
    method: string;
    handler: T;
    isPrivateUser?: boolean;
    isPrivateOrganization?: boolean;
  };

  export type Validator<T> = {
    name: handler;
    handler: NValidatorProvider.ValidateHandler<T>;
  };

  export type Controller<T extends string = string> = {
    name: T;
    handler: NAbstractFrameworkAdapter.Handler;
  };

  export type MongoRepoHandler<
    T extends string = string,
    H extends string = string,
    A extends UnknownObject,
    R = void
  > = {
    name: T;
    handler: NMongodbProvider.MongooseHandlers<H, A, R>;
  };

  export type HelperHandler<T extends (...args: any[]) => any> = T;
  export type Helper<T extends string = string> = {
    name: T;
    handler: HelperHandler;
  };

  export type Controllers<T extends string> = Record<T, NAbstractFrameworkAdapter.Handler>;
  export type Routes<T extends string> = Route<T>[];

  export type DomainStorage = {
    routes?: Map<string, NSchemaLoader.Route>;
    controllers?: Map<string, NAbstractFrameworkAdapter.Handler>;
    helpers?: Map<string, HelperHandler>;
    mongoModel?: string;
    mongoSchema?: NMongodbProvider.SchemaFn<unknown>;
    mongoRepoHandlers?: Map<string, AnyFunction>;
    validators?: Map<string, NValidatorProvider.ValidateHandler>;
  };
  export type Domains = Map<string, DomainStorage>;
  export type Services = Map<string, Domains>;
}
