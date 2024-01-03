import { StringObject, UnknownObject, Voidable } from '../utility';
import {NAbstractFrameworkAdapter} from '../adapters'
import {NContextService} from '../services'
import {NMongodbProvider} from '../providers'

export type ControllerHandler<
  BODY = UnknownObject,
  PARAMS extends StringObject = StringObject,
  HEADERS extends StringObject = StringObject
> = NAbstractFrameworkAdapter.Handler<BODY, PARAMS, HEADERS>;

export type SchemaRequest<
  BODY = UnknownObject,
  PARAMS extends StringObject | void = void,
  HEADERS extends StringObject = StringObject
> = NAbstractFrameworkAdapter.SchemaRequest<BODY, PARAMS, HEADERS, 'fastify'>;
export type SchemaResponse = Voidable<NAbstractFrameworkAdapter.SchemaResponse>;
export type Context<T = void> = NAbstractFrameworkAdapter.Context<T>;
export type Agents = NAbstractFrameworkAdapter.Agents;
export type Store = NContextService.Store;
export type MongoSchemaDefinition<T = UnknownObject> = NMongodbProvider.Schema<T>;

export type * from './setters';
