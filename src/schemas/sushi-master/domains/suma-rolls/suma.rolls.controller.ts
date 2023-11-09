import { Controller } from '@Vendor';
import { SumaRollsSymbols } from './suma.rolls.symbols';
import { NSumaRolls } from '../../../../../types/schemas';

@Controller<NSumaRolls.Controller>(SumaRollsSymbols.Controller, {
  createRoll: async (request, context) => {
    console.log(context.agents.functionalityAgent.discovery);
  },
})
export class SumaRollsController {}
