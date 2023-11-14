import { IAbstractService } from '@Core/Types';
import { Nullable, UnknownObject } from '@Utility/Types';

export interface ISessionService extends IAbstractService {
  openHttpSession<T extends UnknownObject>(userId: string, payload: T): Promise<string>;
  getHttpSessionInfo<T extends UnknownObject>(
    userId: string,
    sessionId: string
  ): Promise<Nullable<T>>;
  deleteHttpSession(userId: string, sessionId: string): Promise<void>;
}

export namespace NSessionService {
  export type Config = {
    serverTag: string;
  };
}
