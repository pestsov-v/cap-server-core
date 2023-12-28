import { NAbstractFrameworkAdapter } from '../adapters';

import { Typeorm } from '@Packages/Types';

export interface ITypeormProvider {
  getRepository<T>(name: string): Typeorm.Repository<T>;
}

export namespace NTypeormProvider {
  export type SchemaFn<T> = (agent: NAbstractFrameworkAdapter.Agents) => Typeorm.EntitySchema<T>;

  export type SchemaInfo<T> = {
    model: string;
    getSchema: NTypeormProvider.SchemaFn<T>;
  };

  export type DocumentHandler<T, ARGS = any, R = void> = (
    repository: Typeorm.Repository<T>,
    ...args: ARGS
  ) => Promise<R>;
}
