import { Controller } from '@Vendor';
import { SumaRollsSymbols } from './suma.rolls.symbols';
import { NSumaRolls } from '../../../../../types/schemas';

@Controller<NSumaRolls.Controller>(SumaRollsSymbols.Controller, {
  createRoll: async () => {},
})
export class SumaRollsController {}
