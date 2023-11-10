import { MetadataKeys } from '@common';
import { UnknownObject } from '@Utility/Types';

import {
  NSchemaDecorators,
  NSchemaLoader,
  NAbstractFrameworkAdapter,
  ISchemaLoader,
  NMongodbProvider,
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

      console.log(mongoSchema);
      loader.setMongoSchema(domain, mongoSchema);

      const handlers = Reflect.getMetadata(
        documents.mongoRepository,
        Reflect
      ) as NMongodbProvider.Handlers;

      for (const handler in handlers) {
        loader.setMongoRepository<string, string, string, UnknownObject>(domain, '', {
          name: handler,
          handler: handlers[handler],
        });
      }
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
  handlers: NMongodbProvider.Handlers<H>
) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, handlers, Reflect);
    return target;
  };
}
