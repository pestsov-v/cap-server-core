import inversify, { ContainerModule } from 'inversify';

export namespace Inversify {
  export namespace interfaces {
    export type Bind = inversify.interfaces.Bind;
    export type Container = inversify.interfaces.Container;
    export type ContainerModule = inversify.ContainerModule;
  }
}
