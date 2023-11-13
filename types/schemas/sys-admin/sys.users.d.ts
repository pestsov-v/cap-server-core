import { Typeorm } from '@Packages/Types';
import { ControllerHandler } from '@Vendor/Types';
import { NTypeormProvider } from '@Core/Types';

export namespace NSysUsers {
  export type UserEntitySchema = {
    USER_ID: string;
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL: string;
    PHONE: string;
  };

  export type UserRepository = {
    create: NTypeormProvider.DocumentHandler<UserEntitySchema>;
  };

  export type UserController = {
    createUser: ControllerHandler;
  };

  export type Paths = keyof UserController;
}
