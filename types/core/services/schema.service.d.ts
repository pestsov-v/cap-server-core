import { IAbstractService, NSchemaLoader, NSpecificationLoader } from '@Core/Types';

export interface ISchemaService extends IAbstractService {
  readonly schema: NSchemaLoader.Services;
  readonly wsListeners: NSchemaLoader.Services;
  readonly specifications: NSpecificationLoader.Services;

  on(event: NSchemaService.Events, listener: () => void): void;
}

export namespace NSchemaService {
  export type ServiceName = 'SchemaService';

  export type Config = {
    schemaPath: string;
    specificationEnable: boolean;
  };

  export type Events =
    | `services:${ServiceName}:schemas-init`
    | `services:${ServiceName}:schemas-load`
    | `services:${ServiceName}:schemas-error`;
}
