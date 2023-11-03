import { Voidable } from '@Utility/Types';

export interface IAbstractConnector {
  start(): Promise<void>;
  stop(): Promise<void>;

  once(event: NAbstractConnector.Event, listener: NAbstractConnector.Listener): void;
  on(event: NAbstractConnector.Event, listener: NAbstractConnector.Listener): void;
  off(event: NAbstractConnector.Event, listener: NAbstractConnector.Listener): void;
  emit(event: NAbstractConnector.Event, listener: NAbstractConnector.Listener): void;
}

export namespace NAbstractConnector {
  export type Event<T extends string = string> = T;
  export type Listener = () => void;
  export type Data<T> = Voidable<T>;
}
