import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
const { joi } = Packages.joi;

import { Nullable } from '@Utility/Types';
import { Joi } from '@Packages/Types';
import { IValidatorProvider, NValidatorProvider } from '@Core/Types';

@injectable()
export class ValidatorProvider implements IValidatorProvider {
  public get validator(): Joi.Root {
    return joi;
  }

  public validate<T>(
    map: Joi.ObjectSchema<T>,
    body: T
  ): Nullable<NValidatorProvider.ErrorResult[]> {
    const validateResult = map.validate(body);

    const errors: NValidatorProvider.ErrorResult[] = [];
    if (validateResult.error && validateResult.error.details) {
      validateResult.error.details.forEach((value) => {
        errors.push({
          message: value.message,
          key: value.context?.key,
          value: value.context?.value,
        });
      });
    }

    return errors.length > 0 ? errors : null;
  }
}
