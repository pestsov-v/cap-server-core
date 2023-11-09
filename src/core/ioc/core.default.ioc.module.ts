import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { Initiator } from '../initiator';
import { FunctionalityAgent } from '../agents';
import { ServiceConnector } from '../connectors';
import { SchemaLoader } from '../loaders/schema.loaders';
import { ContextService, DiscoveryService, LoggerService, SchemaService } from '../services';

import { Inversify } from '@Packages/Types';
import {
  IAbstractService,
  IContextService,
  IFunctionalityAgent,
  IInitiator,
  ILoggerService,
  ISchemaLoader,
  ISchemaService,
  IServiceConnector,
} from '@Core/Types';

export const CoreModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  // Initiator
  bind<IInitiator>(CoreSymbols.Initiator).to(Initiator).inRequestScope();

  // Connectors
  bind<IServiceConnector>(CoreSymbols.ServiceConnector).to(ServiceConnector).inSingletonScope();

  // Services
  bind<IAbstractService>(CoreSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<ILoggerService>(CoreSymbols.LoggerService).to(LoggerService).inSingletonScope();
  bind<ISchemaService>(CoreSymbols.SchemaService).to(SchemaService).inSingletonScope();
  bind<IContextService>(CoreSymbols.ContextService).to(ContextService).inSingletonScope();

  // Loaders
  bind<ISchemaLoader>(CoreSymbols.SchemaLoader).to(SchemaLoader).inSingletonScope();

  // Agents
  bind<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent)
    .to(FunctionalityAgent)
    .inTransientScope();
});
