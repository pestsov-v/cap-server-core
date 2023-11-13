import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;

import { IContextService, ITypeormConnector, ITypeormProvider } from '@Core/Types';
import { CoreSymbols } from '@CoreSymbols';

@injectable()
export class TypeormProvider implements ITypeormProvider {
  constructor(
    @inject(CoreSymbols.TypeormConnector)
    private readonly _typeormConnector: ITypeormConnector,
    @inject(CoreSymbols.ContextService)
    private readonly _contextService: IContextService
  ) {}

  public setEntities() {
    const { connection } = this._typeormConnector;
  }
}
