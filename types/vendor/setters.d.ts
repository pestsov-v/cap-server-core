import {
  AnyObject,
  ControllerHandler,
  ExtendedRecordObject,
  HttpMethod,
  UnknownObject,
} from '../utility';
import { NSessionService } from '../services';
import { NTypeormProvider } from '../providers';
import yup, { ObjectShape } from 'yup';
import { IBaseOperationAgent } from '../agents';
import { FunctionalityAgent } from '../../src/agents';

export type ControllerStructure<T extends Record<string, ControllerHandler>> = T;

export type RouterStructure<T extends string, C extends string> = {
  [key in T]: {
    [key in HttpMethod]?: {
      handler: C;
      params?: string[];
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

export type ValidateHandler<T extends UnknownObject, K extends yup.ObjectShape> = (agents: {
  baseAgent: IBaseOperationAgent['validator'];
  fnAgent: FunctionalityAgent['validator'];
}) => K;
export type ValidateRoute<IN extends yup.ObjectShape = void, OUT extends yup.ObjectShape = void> = {
  in?: ValidateHandler<IN>;
  out?: ValidateHandler<OUT>;
};
export type ValidateStructure<T extends Record<string, ValidateRoute>> = {
  [key in keyof T]: T[key];
};

export type DomainDocuments = {
  router?: RouterStructure<string>;
  controller?: ControllerStructure<UnknownObject>;
  emitter?: EmitterStructure<string>;
  wsListener?: WsListenerStructure<string>;
  typeormSchema?: TypeormSchemaStructure<string, unknown>;
  typeormRepo?: TypeormRepoStructure<Record<string, unknown>>;
  dictionaries?:
    | DictionaryStructure<string, ExtendedRecordObject>
    | DictionaryStructure<string, ExtendedRecordObject>[];
  validator?: ValidateStructure<unknown>;
};
