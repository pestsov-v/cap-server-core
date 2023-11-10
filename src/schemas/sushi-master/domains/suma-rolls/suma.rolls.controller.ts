import { Controller } from '@Vendor';
import { StatusCode } from '@common';
import { SumaRollsSymbols } from './suma.rolls.symbols';

import { NSumaRolls } from '../../../../../types/schemas';
import { SchemaResponse, SchemaRequest, Context } from '@Vendor/Types';

@Controller<NSumaRolls.Controller>(SumaRollsSymbols.Controller, {
  createRoll: async (_: SchemaRequest, context: Context): Promise<SchemaResponse> => {
    const create = context.storage.schema
      .getMongoRepository<NSumaRolls.MongoRepository['create']>()
      .get('create');

    if (create) {
      await create(context.agents.functionalityAgent.mongoose, {
        _id: context.agents.functionalityAgent.utils.uuid,
        name: 'Lol',
        price: 21,
      });
    }

    return { format: 'status', statusCode: StatusCode.GONE };
  },
})
export class SumaRollsController {}
