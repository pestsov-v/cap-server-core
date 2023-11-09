import { IAbstractService } from '@Core/Types';

export interface ISchemaService extends IAbstractService {
  on(event: NSchemaService.Events, listener: () => void): void;
}

export namespace NSchemaService {
  export type ServiceName = 'SchemaService';

  export type Config = {
    schemaPath: string;
  };

  export type Events =
    | `services:${ServiceName}:schemas-init`
    | `services:${ServiceName}:schemas-load`
    | `services:${ServiceName}:schemas-error`;
}
