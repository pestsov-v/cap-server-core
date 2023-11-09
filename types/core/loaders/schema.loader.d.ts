import { NAbstractFrameworkAdapter } from '../adapters';

export interface ISchemaLoader {
  init(): Promise<void>;
  destroy(): Promise<void>;
  applyDomainToService(service: string, domain: string): void;
  setRoute<T extends string>(domain: string, details: NSchemaLoader.Route<T>): void;
  setController<T extends string>(domain: string, details: NSchemaLoader.Controller<T>): void;
  setHelper(domain: string, details: NSchemaLoader.Helper): void;

  serialiseServices(): string;
  deserializeServices(payload: string): Map<string, NSchemaLoader.Domains>;
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
  export type Helper<T extends string = string> = {
    name: T;
    handler: (...args: any[]) => any;
  };

  export type Controllers<T extends string> = Record<T, NAbstractFrameworkAdapter.Handler>;
  export type Routes<T extends string> = Route<T>[];

  export type DomainStorage = {
    routes?: Map<string, NSchemaLoader.Route>;
    controllers?: Map<string, NAbstractFrameworkAdapter.Handler>;
    helpers?: Map<string, (...args: any[]) => any>;
  };
  export type Domains = Map<string, DomainStorage>;
  export type Services = Map<string, Domains>;

  export type SerializeHelpers<T extends string> = {
    [key in T]: string;
  };
  export type SerializeControllers<T extends string> = {
    [key in T]: string;
  };
  export type SerializeRoutes<T extends string> = {
    [key in T]: Route;
  };
  export type SerializeDomain<T extends string> = {
    [key in T]: {
      routes: SerializeRoutes<string>;
      controllers: SerializeControllers<string>;
      helpers: SerializeHelpers<string>;
    };
  };
  export type SerializeServices<T extends string = string> = {
    [key in T]: SerializeDomain;
  };
  export type SerializeSchema = Services;
}
