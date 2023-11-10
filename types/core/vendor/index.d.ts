import { NAbstractFrameworkAdapter, NContextService, NSchemaDecorators } from '@Core/Types';
import { Voidable } from '@Utility/Types';

export type SchemaDocuments = NSchemaDecorators.Documents;
export type ControllerHandler = NAbstractFrameworkAdapter.Handler;

export type SchemaRequest = NAbstractFrameworkAdapter.SchemaRequest;
export type SchemaResponse = Voidable<NAbstractFrameworkAdapter.SchemaResponse>;
export type Context = NAbstractFrameworkAdapter.Context;
export type Agents = NAbstractFrameworkAdapter.Agents;
export type Store = NContextService.Store;
