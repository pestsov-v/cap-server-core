export interface ISchemaLoader {
  setRoute<T extends string>(details: NSchemaLoader.Routes<T>): void;
}

export namespace NSchemaLoader {
  export type Route<T extends string = string> = {
    path: string;
    method: string;
    handler: T;
    isPrivateUser?: boolean;
    isPrivateOrganization?: boolean;
  };

  export type Routes<T extends string> = Route<T>[];
}
