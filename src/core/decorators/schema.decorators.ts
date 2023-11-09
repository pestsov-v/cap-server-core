import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { MetadataKeys } from '@common';

import { Inversify } from '@Packages/Types';
import { NSchemaDecorators, NSchemaLoader, NAbstractFrameworkAdapter } from '@Core/Types';

export function Apply(service: string, domains: string[]) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(service, domains, Reflect);
    injectable()(target);

    return target;
  };
}

export function Collect(domain: string, documents: NSchemaDecorators.Documents) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(domain, documents, Reflect);
    injectable()(target);

    return target;
  };
}

export function Router<R extends string>(name: symbol, routes: NSchemaLoader.Routes<R>) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, routes, Reflect);
    injectable()(target);

    const container = Reflect.getMetadata(
      MetadataKeys.SchemaContainer,
      Reflect
    ) as Inversify.interfaces.Container;

    container.bind(name).to(target);

    return target;
  };
}

export function Controller<C extends Record<keyof C, NAbstractFrameworkAdapter.Handler>>(
  name: symbol,
  controllers: C
) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, controllers, Reflect);
    injectable()(target);

    const container = Reflect.getMetadata(
      MetadataKeys.SchemaContainer,
      Reflect
    ) as Inversify.interfaces.Container;

    container.bind(name).to(target);

    return target;
  };
}

export function Helper<H extends Record<keyof H, unknown>>(name: symbol, helpers: H) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    Reflect.defineMetadata(name, helpers, Reflect);
    injectable()(target);

    const container = Reflect.getMetadata(
      MetadataKeys.SchemaContainer,
      Reflect
    ) as Inversify.interfaces.Container;

    container.bind(name).to(target);

    return target;
  };
}
