import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { CoreSymbols } from '@CoreSymbols';
import { container } from '../ioc/core.ioc';

import {
  Openapi,
  IBaseOperationAgent,
  ISpecificationBaseOperation,
  IValidatorBaseOperation,
  NBaseOperationAgent,
  NSpecificationBaseOperation,
} from '@Core/Types';
import yup from 'yup';

@injectable()
export class BaseOperationAgent implements IBaseOperationAgent {
  public get specification(): NBaseOperationAgent.Specification {
    const operations = container.get<ISpecificationBaseOperation>(
      CoreSymbols.SpecificationBaseOperation
    );

    return {
      openapi: {
        bearerAuth: operations.bearerAuth,
        validateResponse: operations.validateResponse,
        getJsonObjectContent: <T extends Record<string, Openapi.NonArraySchemaObject>>(
          schema: T
        ): NSpecificationBaseOperation.Content => {
          return operations.getJsonObjectContent<T>(schema);
        },
      },
    };
  }

  public get validator(): NBaseOperationAgent.Validator {
    const operations = container.get<IValidatorBaseOperation>(CoreSymbols.ValidatorBaseOperation);

    return {
      getDefValidateResponse: (e: yup.ValidationError) => {
        return operations.getDefValidateResponse(e);
      },
    };
  }
}
