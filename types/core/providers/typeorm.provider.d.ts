import { NAbstractFrameworkAdapter } from '../adapters';

import { Typeorm } from '@Packages/Types';

export interface ITypeormProvider {}

export namespace NTypeormProvider {
  export type SchemaFn<T> = (agent: NAbstractFrameworkAdapter.Agents) => Typeorm.EntitySchema<T>;

  export type SchemaInfo<T> = {
    model: string;
    getSchema: NTypeormProvider.SchemaFn<T>;
  };
}
