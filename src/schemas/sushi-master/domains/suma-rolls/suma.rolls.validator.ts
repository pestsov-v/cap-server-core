import { Validator } from '@Vendor';
import { SumaRollsSymbols } from './suma.rolls.symbols';
import { NSumaRolls } from '../../../../../types/schemas';
import { NFunctionalityAgent, NValidatorProvider } from '@Core/Types';
import { Nullable } from '@Utility/Types';

@Validator<NSumaRolls.Validator>(SumaRollsSymbols.Validator, {
  createRoll: (
    provider: NFunctionalityAgent.Validator,
    body: NSumaRolls.CreateRollParams
  ): Nullable<NValidatorProvider.ErrorResult[]> => {
    const schema = provider.validator.object<NSumaRolls.CreateRollParams>({
      name: provider.validator.string().required().min(3),
      price: provider.validator.number().required().min(0),
    });

    return provider.validate(schema, body);
  },
})
export class SumaRollsValidator {}
