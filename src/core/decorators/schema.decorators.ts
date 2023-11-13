import { MetadataKeys } from '@common';
import { FnObject, UnknownObject } from '@Utility/Types';

import {
  NSchemaDecorators,
  NSchemaLoader,
  NAbstractFrameworkAdapter,
  ISchemaLoader,
  NMongodbProvider,
  NValidatorProvider,
  NTypeormProvider,
} from '@Core/Types';

export function Apply(service: string, domains: string[]) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(service, domains, Reflect);

    const loader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect) as ISchemaLoader;
    domains.forEach((domain) => loader.applyDomainToService(service, domain));

    return target;
  };
}

export function Collect(domain: string, documents: NSchemaDecorators.Documents) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(domain, documents, Reflect);

    const loader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect) as ISchemaLoader;

    loader.setDomain(domain);
    if (documents.router) {
      const routes = Reflect.getMetadata(documents.router, Reflect) as NSchemaLoader.Routes<string>;
      if (routes) {
        routes.forEach((route) => loader.setRoute(domain, route));
      }
    }

    if (documents.controller) {
      const controllers = Reflect.getMetadata(
        documents.controller,
        Reflect
      ) as NSchemaLoader.Controllers<string>;

      for (const controller in controllers) {
        loader.setController<string>(domain, {
          name: controller,
          handler: controllers[controller],
        });
      }
    }

    if (documents.mongoSchema && documents.mongoRepository) {
      const mongoSchema = Reflect.getMetadata(
        documents.mongoSchema,
        Reflect
      ) as NMongodbProvider.SchemaInfo<UnknownObject>;

      loader.setMongoSchema(domain, mongoSchema);

      const handlers = Reflect.getMetadata(
        documents.mongoRepository,
        Reflect
      ) as NMongodbProvider.MongooseHandlers;

      for (const handler in handlers) {
        loader.setMongoRepository<string, string, string, UnknownObject>(
          domain,
          mongoSchema.model,
          {
            name: handler,
            handler: handlers[handler],
          }
        );
      }
    }

    if (documents.validator) {
      const handlers = Reflect.getMetadata(
        documents.validator,
        Reflect
      ) as NValidatorProvider.Handlers<FnObject>;

      for (const handler in handlers) {
        loader.setValidator(domain, {
          name: handler,
          handler: handlers[handler],
        });
      }
    }

    if (documents.typeormSchema) {
      const typeormSchema = Reflect.getMetadata(
        documents.typeormSchema,
        Reflect
      ) as NTypeormProvider.SchemaInfo<UnknownObject>;

      loader.setTypeormSchema(domain, typeormSchema);
    }

    return target;
  };
}

export function Router<R extends string>(name: symbol, routes: NSchemaLoader.Routes<R>) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, routes, Reflect);

    return target;
  };
}

export function Controller<C extends Record<keyof C, NAbstractFrameworkAdapter.Handler>>(
  name: symbol,
  controllers: C
) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, controllers, Reflect);
    return target;
  };
}

export function Helper<H extends Record<keyof H, unknown>>(name: symbol, helpers: H) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, helpers, Reflect);
    return target;
  };
}

export function MongoSchema<T extends UnknownObject>(
  name: symbol,
  model: string,
  getSchema: NMongodbProvider.SchemaFn<T>
) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, { model, getSchema }, Reflect);
    return target;
  };
}

export function MongoRepository<H = UnknownObject>(
  name: symbol,
  handlers: NMongodbProvider.MongooseHandlers<H>
) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, handlers, Reflect);
    return target;
  };
}

export function TypeormSchema<T extends UnknownObject>(
  name: symbol,
  model: string,
  getSchema: NTypeormProvider.SchemaFn<T>
) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, { model, getSchema }, Reflect);
    return target;
  };
}

export function Validator<T extends UnknownObject>(
  name: symbol,
  handlers: NValidatorProvider.Handlers<T>
) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, handlers, Reflect);
    return target;
  };
}
