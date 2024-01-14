import { ISpecificationBaseOperation, IValidatorBaseOperation } from '../base-operations';

export interface IBaseOperationAgent {
  readonly validator: NBaseOperationAgent.Validator;
  readonly specification: NBaseOperationAgent.Specification;
}

export namespace NBaseOperationAgent {
  export type Specification = {
    openapi: {
      readonly bearerAuth: ISpecificationBaseOperation['bearerAuth'];
      readonly validateResponse: ISpecificationBaseOperation['validateResponse'];
      getJsonObjectContent: ISpecificationBaseOperation['getJsonObjectContent'];
    };
  };

  export type Validator = {
    readonly getDefValidateResponse: IValidatorBaseOperation['getDefValidateResponse'];
  };
}
