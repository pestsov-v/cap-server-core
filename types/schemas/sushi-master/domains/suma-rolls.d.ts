import { ControllerHandler } from '@Vendor/Types';
import {
  IValidatorProvider,
  NFunctionalityAgent,
  NMongodbProvider,
  NValidatorProvider,
} from '@Core/Types';
import { Joi } from '@Packages/Types';
import { Nullable } from '@Utility/Types';
import {
  DocumentHandler,
  ExtractHandlerType,
  Handler,
} from '../../../core/providers/validator.provider';

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
    create: NMongodbProvider.DocumentHandler<{ structure: RollStructure }, Promise<void>>;
  };

  export type SchemaMongoRepository = {
    create: NMongodbProvider.MongooseHandler<{ structure: RollStructure }, Promise<void>>;
  };

  export type CreateRollParams = Pick<RollStructure, 'name' | 'price'>;

  export type Validator = {
    createRoll: NValidatorProvider.DocumentHandler<NSumaRolls.CreateRollParams>;
  };

  export type SchemaValidator = {
    createRoll: NValidatorProvider.ValidateHandler<NSumaRolls.CreateRollParams>;
  };
}
