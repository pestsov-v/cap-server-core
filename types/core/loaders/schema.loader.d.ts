import { NAbstractFrameworkAdapter } from '../adapters';
import { NMongodbProvider } from '../providers';
import { UnknownObject } from '@Utility/Types';

export interface ISchemaLoader {
  readonly services: NSchemaLoader.Services;
  readonly mongoSchemas: NMongodbProvider.SchemaFn<UnknownObject>[];

  init(): Promise<void>;
  destroy(): Promise<void>;
  applyDomainToService(service: string, domain: string): void;
  setRoute<T extends string>(domain: string, details: NSchemaLoader.Route<T>): void;
  setController<T extends string>(domain: string, details: NSchemaLoader.Controller<T>): void;
  setHelper(domain: string, details: NSchemaLoader.Helper): void;
  setMongoSchema<T>(domain: string, details: NMongodbProvider.SchemaFn<T>): void;
}

export namespace NSchemaLoader {
  export type Route<T extends string = string> = {
    path: string;
    method: string;
    handler: T;
    isPrivateUser?: boolean;
    isPrivateOrganization?: boolean;
  };

  export type Controller<T extends string = string> = {
    name: T;
    handler: NAbstractFrameworkAdapter.Handler;
  };
  export type HelperHandler = (...args: any[]) => any;
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
    mongoSchema?: NMongodbProvider.SchemaFn<unknown>;
  };
  export type Domains = Map<string, DomainStorage>;
  export type Services = Map<string, Domains>;
}
