import { Joi } from '@Packages/Types';
import { Nullable } from '@Utility/Types';

export interface IValidatorProvider {
  readonly validator: Joi.Root;
  validate<T>(map: Joi.PartialSchemaMap<T>, body: T): Nullable<NValidatorProvider.ErrorResult[]>;
}

export namespace NValidatorProvider {
  export type ErrorResult = {
    message: string;
    key?: string;
    value?: string;
  };
}
