import { injectable, inject, ContainerModule, Container } from 'inversify';
import { EventEmitter } from 'events';

export class Packages {
  public static get inversify() {
    return {
      injectable,
      inject,
      ContainerModule,
      Container,
    };
  }

  public static get events() {
    return { EventEmitter };
  }
}
