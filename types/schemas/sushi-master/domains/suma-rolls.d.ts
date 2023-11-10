import { ControllerHandler } from '@Vendor/Types';

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
}
