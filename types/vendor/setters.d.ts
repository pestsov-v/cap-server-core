import { AnyObject, ExtendedRecordObject, HttpMethod } from '../utility';
import {NAbstractFrameworkAdapter} from '../adapters'
import {NSessionService} from "../services"
import {NTypeormProvider} from "../providers"

export type ControllerStructure<T extends string> = {
  [key in T]: NAbstractFrameworkAdapter.Handler;
};

export type RouterStructure<T extends string, C extends string> = {
  [key in T]: {
    [key in HttpMethod]?: {
      handler: C;
      isPrivateUser?: boolean;
      isPrivateOrganization?: boolean;
    };
  };
};

export type WsListenerStructure<T extends string> = {
  [key in T]: NSessionService.WsListener;
};

export type EmitterStructure<E extends string> = {
  [key in E]: {
    type: NSessionService.ServerEventType | NSessionService.ServerEventType[];
    service: string;
    domain: string;
    isPrivateUser?: boolean;
    isPrivateOrganization?: boolean;
  };
};

export type DictionaryStructure<L extends string, D extends ExtendedRecordObject> = {
  language: L;
  dictionary: D;
};

export type TypeormSchemaStructure<T extends string, S> = {
  model: T;
  getSchema: NTypeormProvider.SchemaFn<S>;
};

export type TypeormRepoStructure<T extends AnyObject> = {
  [key in keyof T]: T[key];
};

export type DomainDocuments = {
  router?: RouterStructure<string>;
  controller?: ControllerStructure<string>;
  emitter?: EmitterStructure<string>;
  wsListener?: WsListenerStructure<string>;
  typeormSchema?: TypeormSchemaStructure<string, unknown>;
  typeormRepo?: TypeormRepoStructure<Record<string, unknown>>;
  dictionaries?:
    | DictionaryStructure<string, ExtendedRecordObject>
    | DictionaryStructure<string, ExtendedRecordObject>[];
};
