import inversify from 'inversify';
import events from 'events';
import nconf from 'nconf';
import winston from 'winston';
import colors from 'colors';
import child_process from 'child_process';
import async_hooks from 'async_hooks';

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
