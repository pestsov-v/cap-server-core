import { Controller } from '@Vendor';
import { ResponseType, StatusCode } from '@common';
import { SumaRollsSymbols } from './suma.rolls.symbols';

import { SchemaResponse, SchemaRequest } from '@Vendor/Types';
import { NSumaRolls } from '../../../../../types/schemas';

@Controller<NSumaRolls.Controller>(SumaRollsSymbols.Controller, {
  createRoll: async (
    req: SchemaRequest<NSumaRolls.CreateRollParams>,
    agents
  ): Promise<SchemaResponse> => {
    const mongoRepository =
      agents.schemaAgent.getMongoRepository<NSumaRolls.SchemaMongoRepository>();
    const validator = agents.schemaAgent.getValidator<NSumaRolls.SchemaValidator>();

    const validateErrors = validator.createRoll(req.body);
    if (validateErrors) {
      return {
        format: 'json',
        responseType: ResponseType.VALIDATION,
        statusCode: StatusCode.BAD_REQUEST,
        data: {
          errors: validateErrors,
        },
      };
    }

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
