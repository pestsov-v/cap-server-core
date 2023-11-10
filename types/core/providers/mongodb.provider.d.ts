import { Mongoose } from '@Packages/Types';
import { NAbstractFrameworkAdapter } from '../adapters';
import * as punycode from 'punycode';
import { UnknownObject } from '@Utility/Types';

export interface IMongodbProvider {
  setModels(models: NMongodbProvider.SchemaInfo<unknown>[]): void;
  create<TRawDocType>(
    model: string,
    docs: Mongoose.Docs<TRawDocType>,
    options?: Mongoose.SaveOptions
  ): Promise<Mongoose.AnyKeys<TRawDocType>>;
}

export namespace NMongodbProvider {
  export type Schema<T> = {
    definition: Mongoose.SchemaDefinition<T>;
    options?: Mongoose.SchemaOptions;
  };

  export type SchemaFn<T> = (
    agents: NAbstractFrameworkAdapter.Agents
  ) => NMongodbProvider.Schema<T>;

  export type SchemaInfo<T> = {
    model: string;
    getSchema: NMongodbProvider.SchemaFn<T>;
  };

  export type Handler = <A extends UnknownObject = UnknownObject, R = void>(...args: A) => R;
  export type Handlers<T = UnknownObject> = {
    [K in keyof T]: Handler<Parameters<T[K]>, ReturnType<T[K]>>;
  };
}
