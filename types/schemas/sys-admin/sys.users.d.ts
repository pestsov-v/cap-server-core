import { ControllerHandler } from '@Vendor/Types';
import { NTypeormProvider } from '@Core/Types';
import { NSysAuth } from './sys.auth';
import { BoolYesNo, Char, Nullable, Varchar } from '@Utility/Types';

export namespace NSysUsers {
  export type Paths =
    | 'v1/profile'
    | 'v1/password'
    | 'v1/reactivate-profile'
    | 'v1/deactivate-profile';

  export type UserEntitySchema = {
    SYS_RG_USER_ID: Char<36>;
    FIRST_NAME: Varchar<50>;
    MIDDLE_NAME: Nullable<Varchar<50>>;
    LAST_NAME: Varchar<50>;
    LOGIN: Nullable<Varchar<50>>;
    EMAIL: Varchar<320>;
    PHONE: Char<13>;
    PASSWORD: Varchar<100>;
    ACTIVATE_TOKEN: BoolYesNo;
    MAX_SESSIONS: number;
    IS_BLOCKED: BoolYesNo;
    IS_VERIFIED: BoolYesNo;
    CREATED_AT: Date;
    UPDATED_AT: Nullable<Date>;
  };

  export type UserCreateUP = {};

  export type UserRepository = {
    create: NTypeormProvider.DocumentHandler<UserEntitySchema>;
  };

  export type UpdateProfileINP = {
    firstName?: UserEntitySchema['FIRST_NAME'];
    lastName?: UserEntitySchema['LAST_NAME'];
    phone?: UserEntitySchema['PHONE'];
    email?: UserEntitySchema['EMAIL'];
  };

  export type UpdatePasswordINP = {
    password: UserEntitySchema['PASSWORD'];
  };
  export type BannedProfileINP = {
    profileId: string;
  };

  export type UserController = {
    getProfile: ControllerHandler<void, void, NSysAuth.PrivateUserHeaders>;
    updateProfile: ControllerHandler<UpdateProfileINP, void, NSysAuth.PrivateUserHeaders>;
    updatePassword: ControllerHandler<UpdatePasswordINP, void, NSysAuth.PrivateUserHeaders>;
    resetPassword: ControllerHandler<void, void, NSysAuth.PrivateUserHeaders>;
    deactivateProfile: ControllerHandler<void, void, NSysAuth.PrivateUserHeaders>;
    reactivateProfile: ControllerHandler<void, void, NSysAuth.PrivateUserHeaders>;
    banProfile: ControllerHandler<BannedProfileINP, void, NSysAuth.PrivateUserHeaders>;
  };

  export type Controller = keyof UserController;
}
