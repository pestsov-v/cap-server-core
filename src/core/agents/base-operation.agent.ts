import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { container } from '../ioc/core.ioc';

import { IBaseOperationAgent, IValidatorBaseOperation, NBaseOperationAgent } from '@Core/Types';

@injectable()
export class BaseOperationAgent implements IBaseOperationAgent {
  public get validator(): NBaseOperationAgent.Validator {
    const operations = container.get<IValidatorBaseOperation>(CoreSymbols.ValidatorBaseOperation);

    return {
      validateOrThrow: (map, body) => {
        return operations.validateOrThrow(map, body);
      },
    };
  }
}
