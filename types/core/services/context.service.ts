import { IAbstractService } from './abstract.service';
import { AsyncHooks } from '@Packages/Types';

export interface IContextService extends IAbstractService {
  readonly storage: AsyncHooks.AsyncLocalStorage<NContextService.Store>;
  readonly store: NContextService.Store;
  exit(callback?: () => void): void;
}

export namespace NContextService {
  export type Store = {
    requestId: string;
    ip: string;
    path: string;
    service: string;
    domain: string;
    action: string;
    method: string;
  };
}
