import { MongoSchema } from '@Vendor';
import { SumaRollsSymbols } from './suma.rolls.symbols';
import { MongoSchemaNames } from '../../mongo-schema.names';
import { NSumaRolls } from '../../../../../types/schemas';

import { Agents, MongoSchemaDefinition } from '@Vendor/Types';

@MongoSchema<NSumaRolls.RollStructure>(
  SumaRollsSymbols.MongoSchema,
  MongoSchemaNames.SUMA_ROLLS,
  (agents: Agents): MongoSchemaDefinition<NSumaRolls.RollStructure> => {
    const { utils } = agents.functionalityAgent;

    return {
      definition: {
        _id: {
          type: 'string',
          default: utils.uuid,
        },
        price: {
          type: 'number',
          required: true,
          validate: {
            validator: function (value: number): boolean {
              return value > 0;
            },
            message: 'Price must be greater than 0',
          },
        },
        name: {
          type: 'string',
          required: true,
          min: 3,
        },
      },
      options: {
        timestamps: true,
        collection: MongoSchemaNames.SUMA_ROLLS,
      },
    };
  }
)
export class SumaRollsMongoSchema {}
