import { NSchemaLoader } from '../loaders';

export interface ISchemaProvider {
  readonly routines: NSchemaLoader.SchemaRoutines;
}

export namespace NSchemaProvider {
  export type Helpers = Map<string, NSchemaLoader.HelperHandler>;

  export type SchemaRoutines = {
    getHelpers: <D extends string>(domain: D) => Helpers;
    getHelper: <D extends string, H extends string>(
      domain: D,
      helper: H
    ) => NSchemaLoader.HelperHandler;
  };
}
