import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';

import { IContextService, ITypeormConnector, ITypeormProvider } from '@Core/Types';

@injectable()
export class TypeormProvider implements ITypeormProvider {
  constructor(
    @inject(CoreSymbols.TypeormConnector)
    private readonly _typeormConnector: ITypeormConnector,
    @inject(CoreSymbols.ContextService)
    private readonly _contextService: IContextService
  ) {}
}
