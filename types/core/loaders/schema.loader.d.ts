import { NAbstractFrameworkAdapter } from '../adapters';

import { AnyFunction, AnyObject, HttpMethod, UnknownObject } from '@Utility/Types';
import { NMongodbProvider, NTypeormProvider, NValidatorProvider } from '../providers';
import { ControllerStructure, RouterStructure, TypeormRepoStructure } from '@Vendor/Types';
import { Typeorm } from '@Packages/Types';

export interface ISchemaLoader {
  readonly services: NSchemaLoader.Services;
  readonly typeormSchemas: NSchemaLoader.TypeormEntities;

  readonly init(): Promise<void>;
  readonly destroy(): Promise<void>;
  readonly setDomain(domain: string): void;
  readonly applyDomainToService(service: string, domain: string): void;
  readonly setRoute(domain: string, route: RouterStructure<string>): void;
  readonly setController(domain: string, controller: ControllerStructure<string>): void;
  readonly setValidator<T>(domain, validator: NSchemaLoader.Validator<T>): void;
  readonly setMongoSchema<T>(domain: string, details: NMongodbProvider.SchemaInfo<T>): void;
  readonly setMongoRepository<
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
  readonly setTypeormSchema<T>(domain: string, details: NTypeormProvider.SchemaInfo<T>): void;
  readonly setTypeormRepository<T extends string = string>(
    domain: string,
    model: string,
    repo: TypeormRepoStructure<AnyObject>
  ): void;
  // setHelper(domain: string, helper: NSchemaLoader.Helper): void;
}

export namespace NSchemaLoader {
  export type Route<T extends string = string> = {
    path: string;
    method: HttpMethod;
    handler: T;
    isPrivateUser?: boolean;
    isPrivateOrganization?: boolean;
  };

  export type Validator<T> = {
    name: handler;
    handler: NValidatorProvider.ValidateHandler<T>;
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

  export type TypeormEntities = Map<string, Typeorm.EntitySchema<unknown>>;

  export type DomainStorage = {
    routes: Map<string, NSchemaLoader.Route>;
    controllers: Map<string, NAbstractFrameworkAdapter.Handler>;
    helpers: Map<string, HelperHandler>;
    mongoModel?: string;
    mongoSchema?: NMongodbProvider.SchemaFn<unknown>;
    mongoRepoHandlers: Map<string, AnyFunction>;
    typeormModel?: string;
    typeormSchema?: NTypeormProvider.SchemaFn<unknown>;
    typeormRepoHandlers: Map<string, AnyFunction>;
    validators: Map<string, NValidatorProvider.ValidateHandler>;
  };
  export type Domains = Map<string, DomainStorage>;
  export type Services = Map<string, Domains>;
}
