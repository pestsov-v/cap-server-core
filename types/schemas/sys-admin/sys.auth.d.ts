import { ControllerHandler } from '@Vendor/Types';
import { NSysUsers } from './sys.users';

export namespace NSysAuth {
  export type PrivateUserHeaders = { 'x-access-token'?: string };

  export type SignupINP = {
    firstName: NSysUsers.UserEntitySchema['FIRST_NAME'];
    lastName: NSysUsers.UserEntitySchema['LAST_NAME'];
    phone: NSysUsers.UserEntitySchema['PHONE'];
    email: NSysUsers.UserEntitySchema['EMAIL'];
    password: NSysUsers.UserEntitySchema['PASSWORD'];
    confirmPassword: NSysUsers.UserEntitySchema['PASSWORD'];
  };

  export type LoginINP = {
    phone: NSysUsers.UserEntitySchema['PHONE'];
    email: NSysUsers.UserEntitySchema['EMAIL'];
    password: NSysUsers.UserEntitySchema['PASSWORD'];
  };

  export type ForgotPasswordINP = {
    email: NSysUsers.UserEntitySchema['EMAIL'];
  };

  export type IController = {
    signup: ControllerHandler<SignupINP>;
    login: ControllerHandler<LoginINP>;
    logout: ControllerHandler;
    forgotPassword: ControllerHandler<ForgotPasswordINP>;
    activateAccount: ControllerHandler<void, string>;
  };

  export type Paths = keyof IController;
}
