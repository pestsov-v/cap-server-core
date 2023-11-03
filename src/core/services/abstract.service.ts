import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { EventEmitter } = Packages.events;
import { Guards } from '@Guards';

import { Events } from '@Packages/Types';
import { IAbstractService, NAbstractService } from '@Core/Types';

@injectable()
export abstract class AbstractService implements IAbstractService {
  protected abstract _SERVICE_NAME: string;
  protected abstract init(): Promise<boolean>;
  protected abstract destroy(): Promise<void>;

  protected _isStarted: boolean = false;
  protected readonly _emitter: Events.EventEmitter = new EventEmitter();

  public get isStarted(): boolean {
    return Guards.isNotUndefined(this._isStarted);
  }

  public once(event: NAbstractService.Event, listener: NAbstractService.Listener): void {
    this._emitter.once(event, listener);
  }

  public on(event: NAbstractService.Event, listener: NAbstractService.Listener): void {
    this._emitter.once(event, listener);
  }

  public emit<T = never>(event: NAbstractService.Event, data?: NAbstractService.Data<T>): void {
    this._emitter.emit(event, data);
  }

  public off(event: NAbstractService.Event, listener: NAbstractService.Listener): void {
    this._emitter.once(event, listener);
  }

  public async start(): Promise<void> {
    if (this._isStarted) return;

    try {
      if (await this.init()) {
        this._isStarted = true;
        console.log(`Service "${this._SERVICE_NAME}" has been started.`);
        this.emit(`services:${this._SERVICE_NAME}:start`);
      } else {
        this._isStarted = false;
      }
    } catch (e) {
      throw e;
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.destroy();
    } catch (e) {
      throw e;
    }
  }
}
