import { Ws } from '@Packages/Types';

export interface IAbstractWebsocketAdapter {
  start(): Promise<void>;
  stop(): Promise<void>;
}

export namespace NAbstractWebsocketAdapter {
  export type WebsocketKind = 'ws';

  export type Instance<K extends WebsocketKind> = K extends 'ws' ? Ws.WebSocketServer : never;

  export type Config = {
    protocol: string;
    host: string;
    port: number;
  };
}
