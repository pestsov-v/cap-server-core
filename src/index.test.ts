export * from './vendor';
export * from './utility/helpers';
export * from './utility/guards';
export * from './common';

import { container } from './ioc/core.ioc';
import { CoreSymbols } from '@CoreSymbols';
import { IInitiator } from '@Core/Types';

const serverInitiator = container.get<IInitiator>(CoreSymbols.Initiator);
export { serverInitiator };

serverInitiator.start();
