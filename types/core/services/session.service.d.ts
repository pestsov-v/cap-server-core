import { IAbstractService } from '@Core/Types';

export interface ISessionService extends IAbstractService {}

export namespace NSessionService {
  export type Config = {
    serverTag: string;
  };
}
