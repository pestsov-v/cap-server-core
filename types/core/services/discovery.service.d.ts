import { IAbstractService } from '@Core/Types';

export interface IDiscoveryService extends IAbstractService {
  getString(name: string, def: string): string;
  getNumber(name: string, def: number): number;
  getBoolean(name: string, def: boolean): boolean;
  getArray<T>(name: string, def: Array<T>): Array<T>;
  getMandatory<T>(name: string): T;
}

export namespace NDiscoveryService {
  export type EnvType<T = unknown> =
    | string
    | number
    | boolean
    | Array<string | number | boolean | T>
    | T;
}
