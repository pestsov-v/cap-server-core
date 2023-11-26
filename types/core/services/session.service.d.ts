import { IAbstractService } from '@Core/Types';
import { Nullable, UnknownObject } from '@Utility/Types';
import { Ws } from '@Packages/Types';

export interface ISessionService extends IAbstractService {
  openHttpSession<T extends UnknownObject>(userId: string, payload: T): Promise<string>;
  getHttpSessionInfo<T extends UnknownObject>(
    userId: string,
    sessionId: string
  ): Promise<Nullable<T>>;
  getHttpSessionCount(userId: string): Promise<number>;
  deleteHttpSession(userId: string, sessionId: string): Promise<void>;

  setWebsocketConnection(ws: Ws.WebSocket, connection: NSessionService.ConnectionDetails): void;
}

export namespace NSessionService {
  export type ServerEvent =
    | 'server:handshake'
    | 'server:session:to:session'
    | 'server:broadcast:to:service';

  export type ClientEvent =
    | 'client:handshake'
    | 'client:session:to:session'
    | 'client:broadcast:to:service';

  export type ServerHandshakePayload = {
    connectionId: string;
  };

  export type ClientHandshakePayload = {
    userId: string;
    sessionId: string;
  };

  export type ClientEventPayload<E extends string, P> = {
    event: E;
    payload: P;
  };

  export type EventStructure<CE extends ClientEvent, E extends string, P> = {
    event: CE;
    payload: CE extends 'client:handshake' ? ClientHandshakePayload : ClientEventPayload<E, P>;
  };

  export type Config = {
    serverTag: string;
  };

  export type ConnectionDetails = {
    userAgent?: string;
    acceptLanguage?: string;
    websocketKey?: string;
    ip?: string;
  };

  export type Connection = ConnectionDetails & {
    socket: Ws.WebSocket;
  };

  export interface BaseSocketRequest {
    anonymous: boolean;
  }
  export interface AnonymousSocketRequest extends BaseSocketRequest {
    anonymous: true;
  }
  export interface AuthorizeSocketRequest<T> extends BaseSocketRequest {
    anonymous: false;
    sessionInfo: T;
  }
  export type SocketRequest<T> = AnonymousSocketRequest | AuthorizeSocketRequest<T>;

  export type ConnectionStorage = Map<string, Connection>;
}
