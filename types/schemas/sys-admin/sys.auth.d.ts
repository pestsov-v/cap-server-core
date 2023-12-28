import { ControllerHandler } from '@Vendor/Types';
import { NSysUsers } from './sys.users';

export namespace NSysAuth {
  export type Paths =
    | 'v1/signup'
    | 'v1/login'
    | 'v1/forgot-password'
    | 'v1/activate-account'
    | 'v1/logout';

  export type Dictionary = {
    auth: {
      IS_BLOCKED: string;
      IS_NOT_VERIFIED: string;
      INCORRECT_PASSWORD: string;
      MORE_MAX_SESSIONS: string;
      UNAUTHORIZED: string;
    };
  };

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

  export type Controller = keyof IController;
}
