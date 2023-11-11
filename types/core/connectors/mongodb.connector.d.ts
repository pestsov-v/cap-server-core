import { IAbstractConnector } from '@Core/Types';
import { Mongoose } from '@Packages/Types';

export interface IMongodbConnector extends IAbstractConnector {
  readonly connection: Mongoose.Mongoose;
  on(event: NMongodbConnector.Events, listener: (...args: any[]) => void): void;
}

export namespace NMongodbConnector {
  export type Events = 'connector:MongoDbConnector:init';
  export type Config = {
    enable: boolean;
    protocol: string;
    host: string;
    port: number;
    database: string;
    auth: {
      username: string;
      password: string;
    };
  };
}
