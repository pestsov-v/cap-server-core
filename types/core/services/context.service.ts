import { IAbstractService } from './abstract.service';
import { AsyncHooks } from '@Packages/Types';

export interface IContextService extends IAbstractService {
  readonly run: AsyncHooks.AsyncLocalStorage<NContextService.Store>['run'];
  readonly store: NContextService.Store;
  exit(callback?: () => void): void;
}

export namespace NContextService {
  export type Store = {};
}
