import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import { Initiator } from '../initiator';
import { FastifyAdapter } from '../adapters';
import { FrameworkFactory } from '../factories';
import { SchemaLoader } from '../loaders';
import { ValidatorBaseOperation } from '../base-operations';
import { FunctionalityAgent, SchemaAgent, BaseOperationAgent, IntegrationAgent } from '../agents';
import {
  MongodbConnector,
  RedisConnector,
  ServiceConnector,
  TypeormConnector,
} from '../connectors';
import {
  ContextService,
  DiscoveryService,
  LocalizationService,
  LoggerService,
  SchemaService,
  ScramblerService,
  SessionService,
} from '../services';
import {
  MongodbProvider,
  SchemaProvider,
  ExceptionProvider,
  ValidatorProvider,
  TypeormProvider,
  RedisProvider,
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
  IRedisProvider,
  IScramblerService,
  ISessionService,
  ILocalizationService,
  IMailIntegration,
  IIntegrationConnector,
  IIntegrationAgent,
  IAbstractWebsocketAdapter,
} from '@Core/Types';
import { MailIntegration } from '../integrations';
import { IntegrationConnector } from '../connectors/integration.connector';
import { WsAdapter } from '../adapters/websocket-adapters';

export const CoreModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  // Initiator
  bind<IInitiator>(CoreSymbols.Initiator).to(Initiator).inRequestScope();

  // Connectors
  bind<IServiceConnector>(CoreSymbols.ServiceConnector).to(ServiceConnector).inSingletonScope();
  bind<IMongodbConnector>(CoreSymbols.MongodbConnector).to(MongodbConnector).inSingletonScope();
  bind<ITypeormConnector>(CoreSymbols.TypeormConnector).to(TypeormConnector).inSingletonScope();
  bind<IRedisConnector>(CoreSymbols.RedisConnector).to(RedisConnector).inSingletonScope();
  bind<IIntegrationConnector>(CoreSymbols.IntegrationConnector)
    .to(IntegrationConnector)
    .inSingletonScope();

  // Services
  bind<IAbstractService>(CoreSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<ILoggerService>(CoreSymbols.LoggerService).to(LoggerService).inSingletonScope();
  bind<ISchemaService>(CoreSymbols.SchemaService).to(SchemaService).inSingletonScope();
  bind<IContextService>(CoreSymbols.ContextService).to(ContextService).inSingletonScope();
  bind<IScramblerService>(CoreSymbols.ScramblerService).to(ScramblerService).inSingletonScope();
  bind<ISessionService>(CoreSymbols.SessionService).to(SessionService).inSingletonScope();
  bind<ILocalizationService>(CoreSymbols.LocalizationService)
    .to(LocalizationService)
    .inSingletonScope();

  // Providers
  bind<ISchemaProvider>(CoreSymbols.SchemaProvider).to(SchemaProvider).inTransientScope();
  bind<IMongodbProvider>(CoreSymbols.MongodbProvider).to(MongodbProvider).inTransientScope();
  bind<ITypeormProvider>(CoreSymbols.TypeormProvider).to(TypeormProvider).inTransientScope();
  bind<IValidatorProvider>(CoreSymbols.ValidatorProvider).to(ValidatorProvider).inTransientScope();
  bind<IExceptionProvider>(CoreSymbols.ExceptionProvider).to(ExceptionProvider).inTransientScope();
  bind<IRedisProvider>(CoreSymbols.RedisProvider).to(RedisProvider).inTransientScope();

  // Integrations
  bind<IMailIntegration>(CoreSymbols.MailIntegration).to(MailIntegration).inSingletonScope();

  // Loaders
  bind<ISchemaLoader>(CoreSymbols.SchemaLoader).to(SchemaLoader).inSingletonScope();

  // Agents
  bind<ISchemaAgent>(CoreSymbols.SchemaAgent).to(SchemaAgent).inTransientScope();
  bind<IIntegrationAgent>(CoreSymbols.IntegrationAgent).to(IntegrationAgent).inTransientScope();
  bind<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent)
    .to(FunctionalityAgent)
    .inTransientScope();
  bind<IBaseOperationAgent>(CoreSymbols.BaseOperationAgent)
    .to(BaseOperationAgent)
    .inTransientScope();

  // Adapters
  bind<IAbstractFrameworkAdapter>(CoreSymbols.FastifyAdapter).to(FastifyAdapter).inSingletonScope();

  bind<IAbstractWebsocketAdapter>(CoreSymbols.WsAdapter).to(WsAdapter).inSingletonScope();

  // Factories
  bind<IAbstractFactory>(CoreSymbols.FrameworkFactory).to(FrameworkFactory).inSingletonScope();

  // base-operations
  bind<IValidatorBaseOperation>(CoreSymbols.ValidatorBaseOperation)
    .to(ValidatorBaseOperation)
    .inTransientScope();
});
