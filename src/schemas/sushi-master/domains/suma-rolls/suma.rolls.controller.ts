import { Controller } from '@Vendor';
import { SumaRollsSymbols } from './suma.rolls.symbols';
import { NSumaRolls } from '../../../../../types/schemas';
import { SchemaResponse, SchemaRequest, Context } from '@Vendor/Types';
import { StatusCode } from '@common';

@Controller<NSumaRolls.Controller>(SumaRollsSymbols.Controller, {
  createRoll: async (_: SchemaRequest, context: Context): Promise<SchemaResponse> => {
    return { format: 'status', statusCode: StatusCode.GONE };
  },
})
export class SumaRollsController {}
