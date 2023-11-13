import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import { Initiator } from '../initiator';
import { FastifyAdapter } from '../adapters';
import { FrameworkFactory } from '../factories';
import { SchemaLoader } from '../loaders';
import { ValidatorBaseOperation } from '../base-operations';
import { FunctionalityAgent, SchemaAgent, BaseOperationAgent } from '../agents';
import {
  MongodbConnector,
  RedisConnector,
  ServiceConnector,
  TypeormConnector,
} from '../connectors';
import { ContextService, DiscoveryService, LoggerService, SchemaService } from '../services';
import {
  MongodbProvider,
  SchemaProvider,
  ExceptionProvider,
  ValidatorProvider,
  TypeormProvider,
} from '../providers';

import { Inversify } from '@Packages/Types';
import {
  IAbstractFactory,
  IAbstractFrameworkAdapter,
  IAbstractService,
  IBaseOperationAgent,
  IContextService,
  IExceptionProvider,
  IFunctionalityAgent,
  IInitiator,
  ILoggerService,
  IMongodbConnector,
  IMongodbProvider,
  ISchemaAgent,
  ISchemaLoader,
  ISchemaProvider,
  ISchemaService,
  IServiceConnector,
  IValidatorProvider,
  IValidatorBaseOperation,
  ITypeormConnector,
  ITypeormProvider,
  IRedisConnector,
} from '@Core/Types';

export const CoreModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  // Initiator
  bind<IInitiator>(CoreSymbols.Initiator).to(Initiator).inRequestScope();

  // Connectors
  bind<IServiceConnector>(CoreSymbols.ServiceConnector).to(ServiceConnector).inSingletonScope();
  bind<IMongodbConnector>(CoreSymbols.MongodbConnector).to(MongodbConnector).inSingletonScope();
  bind<ITypeormConnector>(CoreSymbols.TypeormConnector).to(TypeormConnector).inSingletonScope();
  bind<IRedisConnector>(CoreSymbols.RedisConnector).to(RedisConnector).inSingletonScope();

  // Services
  bind<IAbstractService>(CoreSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<ILoggerService>(CoreSymbols.LoggerService).to(LoggerService).inSingletonScope();
  bind<ISchemaService>(CoreSymbols.SchemaService).to(SchemaService).inSingletonScope();
  bind<IContextService>(CoreSymbols.ContextService).to(ContextService).inSingletonScope();

  // Providers
  bind<ISchemaProvider>(CoreSymbols.SchemaProvider).to(SchemaProvider).inTransientScope();
  bind<IMongodbProvider>(CoreSymbols.MongodbProvider).to(MongodbProvider).inTransientScope();
  bind<ITypeormProvider>(CoreSymbols.TypeormProvider).to(TypeormProvider).inTransientScope();
  bind<IValidatorProvider>(CoreSymbols.ValidatorProvider).to(ValidatorProvider).inTransientScope();
  bind<IExceptionProvider>(CoreSymbols.ExceptionProvider).to(ExceptionProvider).inTransientScope();

  // Loaders
  bind<ISchemaLoader>(CoreSymbols.SchemaLoader).to(SchemaLoader).inSingletonScope();

  // Agents
  bind<ISchemaAgent>(CoreSymbols.SchemaAgent).to(SchemaAgent).inTransientScope();
  bind<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent)
    .to(FunctionalityAgent)
    .inTransientScope();
  bind<IBaseOperationAgent>(CoreSymbols.BaseOperationAgent)
    .to(BaseOperationAgent)
    .inTransientScope();

  // Adapters
  bind<IAbstractFrameworkAdapter>(CoreSymbols.FastifyAdapter).to(FastifyAdapter).inSingletonScope();

  // Factories
  bind<IAbstractFactory>(CoreSymbols.FrameworkFactory).to(FrameworkFactory).inSingletonScope();

  // base-operations
  bind<IValidatorBaseOperation>(CoreSymbols.ValidatorBaseOperation)
    .to(ValidatorBaseOperation)
    .inTransientScope();
});
