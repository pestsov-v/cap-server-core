import { Validator } from '@Vendor';
import { SysAuthSymbols } from './sys.auth.symbols';
import { Nullable } from '@Utility/Types';

import { NSysAuth } from '../../../../../types/schemas/sys-admin/sys.auth';
import { IValidatorProvider, NValidatorProvider } from '@Core/Types';

@Validator<NSysAuth.IValidator>(SysAuthSymbols.Validator, {
  signup: (
    provider: IValidatorProvider,
    body: NSysAuth.SignupINP
  ): Nullable<NValidatorProvider.ErrorResult[]> => {
    const { validator } = provider;
    const schema = validator.object<NSysAuth.SignupINP>({
      firstName: validator.string().max(50).required(),
      lastName: validator.string().max(50).required(),
      phone: validator.string().length(13).required(),
      email: validator.string().email().max(320).required(),
      password: validator.string().max(100).required(),
      confirmPassword: validator.string().valid(validator.ref('password')).required(),
    });

    return provider.validate(schema, body);
  },
  login: (provider: IValidatorProvider, body: NSysAuth.LoginINP) => {
    const { validator } = provider;

    const phoneSchema = validator.string().length(13).required();
    const emailSchema = validator.string().max(320).required();

    const schema = validator.object<NSysAuth.LoginINP>({
      phone: phoneSchema,
      email: validator.alternatives().try(phoneSchema, emailSchema),
      password: validator.string().max(100).required(),
    });

    return provider.validate(schema, body);
  },
  forgotPassword: (provider: IValidatorProvider, body: NSysAuth.ForgotPasswordINP) => {
    const { validator } = provider;
    const schema = validator.object<NSysAuth.ForgotPasswordINP>({
      email: validator.string().email().max(320).required(),
    });

    return provider.validate(schema, body);
  },
})
export class SysAuthValidator {}
