import { Mongoose } from '@Packages/Types';
import { NAbstractFrameworkAdapter } from '../adapters';

export interface IMongodbProvider {
  setModels(models: NMongodbProvider.SchemaFn<unknown>[]): void;
}

export namespace NMongodbProvider {
  export type Schema<T> = {
    model: string;
    definition: Mongoose.SchemaDefinition<T>;
    options?: Mongoose.SchemaOptions;
  };

  export type SchemaFn<T> = (
    agents: NAbstractFrameworkAdapter.Agents
  ) => NMongodbProvider.Schema<T>;
}
