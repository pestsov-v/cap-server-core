import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { container } from '../ioc/core.ioc';

import {
  IAuthBaseOperation,
  IBaseOperationAgent,
  IValidatorBaseOperation,
  NAuthBaseOperation,
  NBaseOperationAgent,
} from '@Core/Types';

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

  public get auth(): NBaseOperationAgent.Auth {
    const operations = container.get<IAuthBaseOperation>(CoreSymbols.AuthBaseOperation);

    return {
      getNonUnauthorized: (status: number, message: string): NAuthBaseOperation.FailResponse => {
        return operations.getFailResponse(status, message);
      },
    };
  }
}
