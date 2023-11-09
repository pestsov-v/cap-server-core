import { IFunctionalityAgent } from '../agents';
import { NContextService } from '../services';

import { Express, Fastify } from '@Packages/Types';
import { Voidable } from '@Utility/Types';
import { NSchemaLoader } from '../loaders';

export interface IAbstractFrameworkAdapter {
  start(schema: NSchemaLoader.Services): Promise<void>;
}

export namespace NAbstractFrameworkAdapter {
  export type FrameworkKind = 'express' | 'fastify';
  export type Config = {
    serverTag: string;
    protocol: string;
    host: string;
    port: number;
    urls: {
      api: string;
    };
  };

  export type Request<K extends FrameworkKind> = K extends 'express'
    ? Express.Request
    : K extends 'fastify'
    ? Fastify.Request
    : never;

  export type Agents = {
    functionalityAgent: IFunctionalityAgent;
  };
  export type storage = {
    store: NContextService.Store;
    schema: Schema;
  };
  export type Schema = {
    getRepository: (domain: string) => any;
  };
  export type Packages = Record<string, unknown>;

  export type Response<K extends FrameworkKind> = K extends 'express'
    ? Express.Response
    : K extends 'fastify'
    ? Fastify.Response
    : never;

  export type Instance<K extends FrameworkKind> = K extends 'express'
    ? Express.Instance
    : K extends 'fastify'
    ? Fastify.Instance
    : never;

  export type Context = {
    agents: Agents;
    storage: storage;
    packages: Packages;
  };

  export type Handler = <K extends FrameworkKind>(
    request: Request<K>,
    context: Context
  ) => Promise<Voidable<Response>>;

  export type FailSchemaParameter = 'application' | 'domain' | 'action' | 'action-version';

  interface BaseSchemaPayload {
    ok: boolean;
  }
  interface SchemaPayloadFail extends BaseSchemaPayload {
    ok: false;
    message: string;
  }
  interface SchemaPayloadOK extends BaseSchemaPayload {
    ok: true;
    application: string;
    domain: string;
    action: string;
  }

  export type SchemaPayload = SchemaPayloadOK | SchemaPayloadFail;
}
