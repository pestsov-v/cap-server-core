import events from 'events';
import child_process from 'child_process';
import async_hooks from 'async_hooks';

import nconf from 'nconf';
import winston from 'winston';
import colors from 'colors';
import inversify from 'inversify';
import fastify from 'fastify';
import express from 'express';
import mongoose from 'mongoose';

import { StringObject, UnknownObject } from '@Utility/Types';

export namespace Inversify {
  export namespace interfaces {
    export type Bind = inversify.interfaces.Bind;
    export type Container = inversify.interfaces.Container;
    export type ContainerModule = inversify.ContainerModule;
  }
}

export namespace Events {
  export type EventEmitter = events.EventEmitter;
}

export namespace Nconf {
  export type Provider = nconf.Provider;
}

export namespace Winston {
  export type format = winston.format;
  export type Logger = winston.Logger;
  export type Container = winston.Container;
  export type transport = winston.transport;
  export type TransformableInfo = winston.TransformableInfo;
}

export namespace Color {
  export type Color = colors.Color;
}

export namespace ChildProcess {
  export type Worker = child_process.Worker;
}

export namespace AsyncHooks {
  export type AsyncLocalStorage<T> = async_hooks.AsyncLocalStorage<T>;
}

export namespace Fastify {
  export type Request = fastify.FastifyRequest;
  export type Response = fastify.FastifyReply;
  export type Instance = fastify.FastifyInstance;

  export type SchemaRequest<
    BODY extends UnknownObject = UnknownObject,
    PARAMS extends StringObject = StringObject,
    HEADERS extends StringObject = StringObject
  > = {
    url: string;
    headers: HEADERS & fastify.FastifyRequest['headers'];
    method: fastify.FastifyRequest['method'];
    path: string;
    params: PARAMS;
    body: BODY;
    query: fastify.FastifyRequest['query'];
  };
}

export namespace Express {
  export type Request = express.Request;
  export type Response = express.Response;
  export type Instance = express.Express;
}

export namespace Mongoose {
  export type Mongoose = mongoose.Mongoose;
  export type ConnectionOptions = mongoose.ConnectOptions;
  export type SchemaDefinition<T> = mongoose.SchemaDefinition<T>;
  export type SchemaOptions = mongoose.SchemaOptions;

  export type AnyKeys<T> = mongoose.AnyKeys<T>;
  export type Docs<TRawDocType, DocContents = AnyKeys<TRawDocType>> = Array<
    TRawDocType | DocContents
  >;
  export type SaveOptions = mongoose.SaveOptions;
}
