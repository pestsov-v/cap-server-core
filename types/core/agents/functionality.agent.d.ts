import { IMongodbProvider } from '../providers';

export interface IFunctionalityAgent {
  readonly discovery: NFunctionalityAgent.Discovery;
  readonly mongoose: NFunctionalityAgent.Mongoose;
  readonly utils: NFunctionalityAgent.Utils;
}

export namespace NFunctionalityAgent {
  export type Discovery = {
    getMandatory: <T>(name: string) => T;
    getString: (name: string, def: string) => string;
    getNumber: (name: string, def: number) => number;
    getBoolean: (name: string, def: boolean) => boolean;
    getArray: <T>(name: string, def: Array<T>) => Array<T>;
    getBuffer: (path: string) => Promise<Buffer>;
  };

  export type Mongoose = {
    create: IMongodbProvider['create'];
  };

  export type Utils = {
    uuid: string;
  };
}
