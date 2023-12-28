import { Controller } from '@Vendor';
import { StatusCode } from '@common';
import { SumaRollsSymbols } from './suma.rolls.symbols';

import { SchemaResponse, SchemaRequest } from '@Vendor/Types';
import { NSumaRolls } from '../../../../../types/schemas';
import { NAbstractFrameworkAdapter } from '@Core/Types';

@Controller<NSumaRolls.Controller>(SumaRollsSymbols.Controller, {
  createRoll: async (
    req: SchemaRequest<NSumaRolls.CreateRollParams>,
    agents: NAbstractFrameworkAdapter.Agents
  ): Promise<SchemaResponse> => {
    const mongoRepository =
      agents.schemaAgent.getMongoRepository<NSumaRolls.SchemaMongoRepository>();
    const schema =
      agents.functionalityAgent.validator.validator.object<NSumaRolls.CreateRollParams>({
        name: agents.functionalityAgent.validator.validator.string().required().min(3),
        price: agents.functionalityAgent.validator.validator.number().required().min(0),
      });

    const errors = agents.baseAgent.validator.validateOrThrow<NSumaRolls.CreateRollParams>(
      schema,
      req.body
    );
    if (errors) throw errors;

    try {
      const id = agents.functionalityAgent.utils.uuid;
      await mongoRepository.create<NSumaRolls.RollStructure>({
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
