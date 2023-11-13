import { IAbstractConnector } from './abstract.connector';
import { Typeorm } from '@Packages/Types';
import { Voidable } from '@Utility/Types';

export interface ITypeormConnector extends IAbstractConnector {
  readonly connection: Typeorm.DataSource;

  emit<T>(event: NTypeormConnector.Events, data?: Voidable<T>): void;
  on(event: NTypeormConnector.Events, listener: () => void): void;
}

export namespace NTypeormConnector {
  export type Events =
    | 'connector:TypeormConnector:start'
    | 'connector:TypeOrmConnector:entities:load';
  export type DatabaseType = Typeorm.DatabaseType;

  export type Config = {
    enable: boolean;
    type: DatabaseType;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
}
