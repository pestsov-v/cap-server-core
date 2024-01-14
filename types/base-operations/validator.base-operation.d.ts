import { Nullable, UnknownObject } from '../utility';
import { Joi, yup } from '../packages/packages';
import { IValidatorError } from '../providers';
import { SchemaResponse } from '../vendor';

export interface IValidatorBaseOperation {
  readonly getDefValidateResponse(e: any): SchemaResponse<NValidatorBaseOperation.ResponseData>;
}

export namespace NValidatorBaseOperation {
  export type ResponseData = {
    errors?: string[];
    message: string;
  };
}
