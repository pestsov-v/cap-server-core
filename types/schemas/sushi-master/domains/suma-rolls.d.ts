import { ControllerHandler } from '@Vendor/Types';

export namespace NSumaRolls {
  export type Controller = {
    createRoll: ControllerHandler;
  };
  export type Paths = keyof Controller;
}
