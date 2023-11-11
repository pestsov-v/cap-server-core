import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { Initiator } from '../initiator';
import { FunctionalityAgent, SchemaAgent } from '../agents';
import { MongodbConnector, ServiceConnector } from '../connectors';
import { SchemaLoader } from '../loaders/schema.loaders';
import { MongodbProvider, SchemaProvider } from '../providers';
import { ContextService, DiscoveryService, LoggerService, SchemaService } from '../services';
import { FastifyAdapter } from '../adapters/framework-adapters';
import { FrameworkFactory } from '../factories/framework.factory';

import { Inversify } from '@Packages/Types';
import {
  IAbstractFactory,
  IAbstractFrameworkAdapter,
  IAbstractService,
  IContextService,
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
} from '@Core/Types';

export const CoreModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  // Initiator
  bind<IInitiator>(CoreSymbols.Initiator).to(Initiator).inRequestScope();

  // Connectors
  bind<IServiceConnector>(CoreSymbols.ServiceConnector).to(ServiceConnector).inSingletonScope();
  bind<IMongodbConnector>(CoreSymbols.MongodbConnector).to(MongodbConnector).inSingletonScope();

  // Services
  bind<IAbstractService>(CoreSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<ILoggerService>(CoreSymbols.LoggerService).to(LoggerService).inSingletonScope();
  bind<ISchemaService>(CoreSymbols.SchemaService).to(SchemaService).inSingletonScope();
  bind<IContextService>(CoreSymbols.ContextService).to(ContextService).inSingletonScope();

  // Providers
  bind<ISchemaProvider>(CoreSymbols.SchemaProvider).to(SchemaProvider).inTransientScope();
  bind<IMongodbProvider>(CoreSymbols.MongodbProvider).to(MongodbProvider).inTransientScope();

  // Loaders
  bind<ISchemaLoader>(CoreSymbols.SchemaLoader).to(SchemaLoader).inSingletonScope();

  // Agents
  bind<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent)
    .to(FunctionalityAgent)
    .inTransientScope();
  bind<ISchemaAgent>(CoreSymbols.SchemaAgent).to(SchemaAgent).inTransientScope();

  // Adapters
  bind<IAbstractFrameworkAdapter>(CoreSymbols.FastifyAdapter).to(FastifyAdapter).inSingletonScope();

  // Factories
  bind<IAbstractFactory>(CoreSymbols.FrameworkFactory).to(FrameworkFactory).inSingletonScope();
});
