import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { EventEmitter } = Packages.events;

import { IAbstractConnector, NAbstractConnector } from '@Core/Types';
import { Events } from '@Packages/Types';

@injectable()
export abstract class AbstractConnector implements IAbstractConnector {
  protected readonly _emitter: Events.EventEmitter = new EventEmitter();
  public abstract start(): Promise<void>;
  public abstract stop(): Promise<void>;

  public once(event: NAbstractConnector.Event, listener: NAbstractConnector.Listener): void {
    this._emitter.once(event, listener);
  }

  public on(event: NAbstractConnector.Event, listener: NAbstractConnector.Listener): void {
    this._emitter.on(event, listener);
  }

  public off(event: NAbstractConnector.Event, listener: NAbstractConnector.Listener): void {
    this._emitter.off(event, listener);
  }

  public emit(event: NAbstractConnector.Event, listener: NAbstractConnector.Listener): void {
    this._emitter.emit(event, listener);
  }
}
