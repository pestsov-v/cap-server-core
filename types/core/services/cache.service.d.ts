import { IAbstractService } from './abstract.service';

export interface ICacheService extends IAbstractService {}

export namespace NCacheService {
  export type ValidFlag = 'valid' | 'invalid';
  export type UpdateFlag = 'actual' | 'wait-processing' | 'processing';

  export type CachePayload<P> = {
    cdnKey?: string;
    cacheVersion: number;
    validFlag: ValidFlag;
    updateFlag: UpdateFlag;
    payload: P;
  };
}
