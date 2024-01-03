import { container } from './ioc/core.ioc';
import { CoreSymbols } from '@CoreSymbols';
import { IInitiator } from '@Core/Types';

export * from './vendor'
export * from './utility/helpers'
export * from './utility/guards'
export * from './common'

const serverInitiator = container.get<IInitiator>(CoreSymbols.Initiator);
export { serverInitiator };


