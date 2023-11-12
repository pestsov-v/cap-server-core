import { Nullable, UnknownObject } from '@Utility/Types';
import { Joi } from '@Packages/Types';
import { IValidatorError } from '../providers';

export interface IValidatorBaseOperation {
  validateOrThrow<T extends UnknownObject = UnknownObject>(
    map: Joi.ObjectSchema<T>,
    body: T
  ): Nullable<IValidatorError>;
}

export namespace NValidatorBaseOperation {}
