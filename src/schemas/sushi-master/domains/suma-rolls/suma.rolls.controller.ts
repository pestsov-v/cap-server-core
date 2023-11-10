import { Controller } from '@Vendor';
import { SumaRollsSymbols } from './suma.rolls.symbols';
import { DomainName, NSumaRolls } from '../../../../../types/schemas';
import { SchemaResponse, SchemaRequest, Context } from '@Vendor/Types';
import { StatusCode } from '@common';

@Controller<NSumaRolls.Controller>(SumaRollsSymbols.Controller, {
  async createRoll(_: SchemaRequest, context: Context): Promise<SchemaResponse> {
    console.log('sas');
    return { format: 'status', statusCode: StatusCode.GONE };
  },
})
export class SumaRollsController {}
