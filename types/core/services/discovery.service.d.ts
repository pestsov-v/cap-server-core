import { IAbstractService } from '@Core/Types';

export interface IDiscoveryService extends IAbstractService {
  getMandatory<T>(name: string): T;
  getString(name: string, def: string): string;
  getNumber(name: string, def: number): number;
  getBoolean(name: string, def: boolean): boolean;
  getArray<T>(name: string, def: Array<T>): Array<T>;
  getCertificateBuffer(path: string): Promise<Buffer>;
  getCertificateString(path: string): Promise<string>;
}

export namespace NDiscoveryService {
  export type EnvType<T = unknown> =
    | string
    | number
    | boolean
    | Array<string | number | boolean | T>
    | T;
}
