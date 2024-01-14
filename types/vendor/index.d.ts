import { StringObject, UnknownObject, Voidable } from '../utility';
import { NAbstractHttpAdapter } from '../adapters';
import { NContextService } from '../services';
import { NMongodbProvider } from '../providers';

export type SchemaRequest<
  BODY = UnknownObject,
  PARAMS extends StringObject | void = void,
  HEADERS extends StringObject = StringObject,
  RESULT extends UnknownObject = void
> = NAbstractHttpAdapter.SchemaRequest<BODY, PARAMS, HEADERS, 'fastify'>;

export type SchemaResponse<RESULT extends UnknownObject = void> = Voidable<
  NAbstractHttpAdapter.SchemaResponse<RESULT>
>;
export type Context<T = void> = NAbstractHttpAdapter.Context<T>;
export type Agents = NAbstractHttpAdapter.Agents;
export type Store = NContextService.Store;
export type MongoSchemaDefinition<T = UnknownObject> = NMongodbProvider.Schema<T>;

export type * from './setters';
