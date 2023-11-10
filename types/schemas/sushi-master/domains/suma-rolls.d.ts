import { ControllerHandler } from '@Vendor/Types';
import { NFunctionalityAgent } from '@Core/Types';

export namespace NSumaRolls {
  export type RollStructure = {
    _id: string;
    name: string;
    price: number;
  };

  export type Controller = {
    createRoll: ControllerHandler;
  };
  export type Paths = keyof Controller;

  export type MongoRepository = {
    create: (mongoose: NFunctionalityAgent.Mongoose, structure: RollStructure) => Promise<void>;
  };
}
