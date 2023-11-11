import { Controller } from '@Vendor';
import { StatusCode } from '@common';
import { SumaRollsSymbols } from './suma.rolls.symbols';

import { SchemaResponse, SchemaRequest } from '@Vendor/Types';
import { NSumaRolls } from '../../../../../types/schemas';

@Controller<NSumaRolls.Controller>(SumaRollsSymbols.Controller, {
  createRoll: async (
    req: SchemaRequest<NSumaRolls.CreateRollParams>,
    agents
  ): Promise<SchemaResponse> => {
    const mongoRepository = agents.schemaAgent.getMongoRepository<NSumaRolls.MongoRepository>();

    try {
      const id = agents.functionalityAgent.utils.uuid;

      await mongoRepository.create(agents.functionalityAgent.mongoose, {
        _id: id,
        name: req.body.name,
        price: req.body.price,
      });

      return {
        format: 'json',
        statusCode: StatusCode.CREATED,
        data: { id },
      };
    } catch (e) {
      throw e;
    }
  },
})
export class SumaRollsController {}
