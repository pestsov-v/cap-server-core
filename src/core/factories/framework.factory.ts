import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractFactory } from './abstract.factory';

import {
  IAbstractFactory,
  IAbstractFrameworkAdapter,
  IDiscoveryService,
  NSchemaLoader,
} from '@Core/Types';

@injectable()
export class FrameworkFactory extends AbstractFactory implements IAbstractFactory {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.FastifyAdapter)
    private readonly _fastifyAdapter: IAbstractFrameworkAdapter
  ) {
    super();
  }

  public async run<T>(schema: T): Promise<void> {
    const adapter = this._discoveryService.getString('adapters:framework:kind', 'fastify');
    switch (adapter) {
      case 'fastify':
        await this._fastifyAdapter.start(schema as NSchemaLoader.Services);
        break;
      case 'express':
        throw new Error('Adapter not implemented');
      default:
        throw new Error(`Adapter "${adapter}" not found`);
    }
  }
}
