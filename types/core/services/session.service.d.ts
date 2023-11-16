import { IAbstractService, NAbstractFrameworkAdapter } from '@Core/Types';
import { Nullable, UnknownObject } from '@Utility/Types';

export interface ISessionService extends IAbstractService {
  openHttpSession<T extends UnknownObject>(userId: string, payload: T): Promise<string>;
  getHttpSessionInfo<T extends UnknownObject>(
    userId: string,
    sessionId: string
  ): Promise<Nullable<T>>;
  getHttpSessionCount(userId: string): Promise<number>;
  deleteHttpSession(userId: string, sessionId: string): Promise<void>;
}

export namespace NSessionService {
  export type ServerEventType = 'server:handshake';

  export type ClientEventType = 'client:handshake';

  export type Config = {
    serverTag: string;
  };

  export type WsListener = (
    agents: NAbstractFrameworkAdapter.Agents,
    context: NAbstractFrameworkAdapter.Context
  ) => Promise<R | void>;
}
