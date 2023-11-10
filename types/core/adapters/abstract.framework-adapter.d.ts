import { IFunctionalityAgent } from '../agents';
import { NContextService } from '../services';

import { Express, Fastify } from '@Packages/Types';
import { AnyFunction, UnknownObject, Voidable } from '@Utility/Types';
import { NSchemaLoader } from '../loaders';
import { Helpers } from '../providers/schema.provider';

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
    getHelpers: <D extends string>(domain: D) => Helpers;
    getHelper: <D extends string, H extends string>(
      domain: D,
      helper: H
    ) => NSchemaLoader.HelperHandler;
    getMongoRepository: <T extends AnyFunction = AnyFunction>() => Map<string, T>;
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

  export type SchemaRequest<K extends FrameworkKind = FrameworkKind> = K extends 'express'
    ? any
    : K extends 'fastify'
    ? Fastify.SchemaRequest
    : never;

  export type ResponseFormat = 'json' | 'redirect' | 'status';

  export interface BaseResponsePayload {
    format: ResponseFormat;
  }

  export interface RedirectResponsePayload extends BaseResponsePayload {
    format: 'redirect';
    type?: 'redirect';
    StatusCode?: number;
    url: string;
  }
  export interface StatusResponsePayload extends BaseResponsePayload {
    format: 'status';
    statusCode?: number;
  }
  export interface JSONResponsePayload extends BaseResponsePayload {
    format: 'json';
    type?: 'OK';
    statusCode?: number;
    data?: UnknownObject;
  }

  export type SchemaResponse =
    | RedirectResponsePayload
    | StatusResponsePayload
    | JSONResponsePayload;

  export type Handler = <K extends FrameworkKind>(
    request: SchemaRequest<K>,
    context: Context
  ) => Promise<Voidable<SchemaResponse>>;

  export type FailSchemaParameter = 'service' | 'domain' | 'action';

  interface BaseSchemaPayload {
    ok: boolean;
  }
  interface SchemaPayloadFail extends BaseSchemaPayload {
    ok: false;
    message: string;
  }
  interface SchemaPayloadOK extends BaseSchemaPayload {
    ok: true;
    service: string;
    domain: string;
    action: string;
  }

  export type SchemaPayload = SchemaPayloadOK | SchemaPayloadFail;
}
