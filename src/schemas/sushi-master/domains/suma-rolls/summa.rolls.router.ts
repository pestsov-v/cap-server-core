import { Router } from '@Vendor';
import { SumaRollsSymbols } from './suma.rolls.symbols';
import { NSumaRolls } from '../../../../../types/schemas';

@Router<NSumaRolls.Paths>(SumaRollsSymbols.Router, [
  {
    handler: 'createRoll',
    method: 'POST',
    path: 'v1/create-roll',
    isPrivateUser: false,
    isPrivateOrganization: false,
  },
])
export class SummaRollsRouter {}
