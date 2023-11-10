import { NSchemaLoader } from '../loaders';
import { AnyFunction } from '@Utility/Types';

export interface ISchemaProvider {
  readonly routines: NSchemaProvider.SchemaRoutines;
}

export namespace NSchemaProvider {
  export type Helpers = Map<string, NSchemaLoader.HelperHandler>;

  export type SchemaRoutines = {
    getHelpers: <D extends string>(services: NSchemaLoader.Services, domain: D) => Helpers;
    getHelper: <D extends string, H extends string>(
      services: NSchemaLoader.Services,
      domain: D,
      helper: H
    ) => NSchemaLoader.HelperHandler;
    getMongoRepository: <T extends AnyFunction = AnyFunction>(
      services: NSchemaLoader.Services
    ) => Map<string, T>;
  };
}
