import { UnknownObject, Voidable } from '@Utility/Types';
import {
  NAbstractFrameworkAdapter,
  NContextService,
  NMongodbProvider,
  NSchemaDecorators,
} from '@Core/Types';

export type SchemaDocuments = NSchemaDecorators.Documents;
export type ControllerHandler = NAbstractFrameworkAdapter.Handler;

export type SchemaRequest = NAbstractFrameworkAdapter.SchemaRequest;
export type SchemaResponse = Voidable<NAbstractFrameworkAdapter.SchemaResponse>;
export type Context = NAbstractFrameworkAdapter.Context;
export type Agents = NAbstractFrameworkAdapter.Agents;
export type Store = NContextService.Store;
export type MongoSchemaDefinition<T = UnknownObject> = NMongodbProvider.Schema<T>;
