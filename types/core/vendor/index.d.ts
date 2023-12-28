import { StringObject, UnknownObject, Voidable } from '@Utility/Types';
import { NAbstractFrameworkAdapter, NContextService, NMongodbProvider } from '@Core/Types';

export type ControllerHandler<
  BODY = UnknownObject,
  PARAMS extends StringObject = StringObject,
  HEADERS extends StringObject = StringObject
> = NAbstractFrameworkAdapter.Handler<BODY, PARAMS, HEADERS>;

export type SchemaRequest<
  BODY = UnknownObject,
  PARAMS extends StringObject = StringObject,
  HEADERS extends StringObject = StringObject
> = NAbstractFrameworkAdapter.SchemaRequest<BODY, PARAMS, HEADERS, 'fastify'>;
export type SchemaResponse = Voidable<NAbstractFrameworkAdapter.SchemaResponse>;
export type Context = NAbstractFrameworkAdapter.Context;
export type Agents = NAbstractFrameworkAdapter.Agents;
export type Store = NContextService.Store;
export type MongoSchemaDefinition<T = UnknownObject> = NMongodbProvider.Schema<T>;

export type * from './setters';
