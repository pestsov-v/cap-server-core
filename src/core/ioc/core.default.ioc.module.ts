import { Packages } from '@Packages';
const { ContainerModule } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { Initiator } from '../initiator';
import { ServiceConnector } from '../connectors';

import { Inversify } from '@Packages/Types';
import { IAbstractService, IInitiator, ILoggerService, IServiceConnector } from '@Core/Types';
import { DiscoveryService, LoggerService } from '../services';

export const CoreModule = new ContainerModule((bind: Inversify.interfaces.Bind) => {
  // Initiator
  bind<IInitiator>(CoreSymbols.Initiator).to(Initiator).inRequestScope();

  // Connectors
  bind<IServiceConnector>(CoreSymbols.ServiceConnector).to(ServiceConnector).inSingletonScope();

  // Services
  bind<IAbstractService>(CoreSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<ILoggerService>(CoreSymbols.LoggerService).to(LoggerService).inSingletonScope();
});
