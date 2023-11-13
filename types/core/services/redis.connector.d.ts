import { IAbstractConnector } from '../connectors';

export interface IRedisConnector extends IAbstractConnector {}

export namespace NRedisConnector {
  export type Config = {
    enable: boolean;
    protocol: string;
    host: string;
    port: number;
    options: {
      retryTimeout: number;
      retryCount: number;
      storageMode: string;
      enableAutoPipelining: boolean;
      maxRetriesPerRequest: number;
      showFriendlyErrorStack: boolean;
    };
  };
}
