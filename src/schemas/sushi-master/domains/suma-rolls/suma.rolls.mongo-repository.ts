import { MongoRepository } from '@Vendor';
import { SumaRollsSymbols } from './suma.rolls.symbols';
import { MongoSchemaNames } from '../../mongo-schema.names';
import { NSumaRolls } from '../../../../../types/schemas';
import { NFunctionalityAgent } from '@Core/Types';

@MongoRepository<NSumaRolls.MongoRepository>(SumaRollsSymbols.MongoRepository, {
  create: async (
    mongoose: NFunctionalityAgent.Mongoose,
    structure: NSumaRolls.RollStructure
  ): Promise<void> => {
    try {
      await mongoose.create(MongoSchemaNames.SUMA_ROLLS, [structure]);
    } catch (e) {
      throw e;
    }
  },
})
export class SumaRollsMongoRepository {}
