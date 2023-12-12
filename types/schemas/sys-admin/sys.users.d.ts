import { ControllerHandler } from '@Vendor/Types';
import { NSessionService, NTypeormProvider } from '@Core/Types';
import { NSysAuth } from './sys.auth';
import { BoolYesNo, Char, Nullable, Varchar } from '@Utility/Types';
import { Typeorm } from '@Packages/Types';

export namespace NSysUsers {
  export type Paths =
    | 'v1/profile'
    | 'v1/password'
    | 'v1/reactivate-profile'
    | 'v1/deactivate-profile';

  export type UserEntitySchema = {
    sys_rg_user_id: Char<36>;
    first_name: Varchar<50>;
    middle_name: Nullable<Varchar<50>>;
    last_name: Varchar<50>;
    login: Nullable<Varchar<50>>;
    email: Varchar<320>;
    phone: Char<13>;
    password: Varchar<100>;
    activate_token: string;
    max_sessions: number;
    is_blocked: BoolYesNo;
    is_verified: BoolYesNo;
    created_at: Date;
    updated_at: Nullable<Date>;
  };

  export type IRepository = {
    create: NTypeormProvider.DocumentHandler<UserEntitySchema, NSysUsers.UserEntitySchema>;
    find: NTypeormProvider.DocumentHandler<UserEntitySchema, void, UserEntitySchema[]>;
    findOne: (
      repository: Typeorm.Repository<UserEntitySchema>,
      phone?: string,
      email?: string
    ) => Promise<Nullable<UserEntitySchema>>;
  };

  export type OrderBy<T extends string = string> = { column: T; sorted: 'ASC' | 'DESC' };

  export type FindParams = {
    raws?: number;
    orderBy?: OrderBy[];
  };

  export type SchemaRepository = {
    create: (user: NSysUsers.UserEntitySchema) => Promise<void>;
    find: (params?: FindParams) => Promise<NSysUsers.UserEntitySchema[]>;
    findOne: (phone?: string, email?: string) => Promise<Nullable<UserEntitySchema>>;
  };

  export type WsListener = 'loginOrganizationUser';

  export type UpdateProfileINP = {
    firstName?: UserEntitySchema['first_name'];
    lastName?: UserEntitySchema['last_name'];
    phone?: UserEntitySchema['phone'];
    email?: UserEntitySchema['email'];
  };

  export type UpdatePasswordINP = {
    password: UserEntitySchema['password'];
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
    getUsers: ControllerHandler<NSysUsers.UserEntitySchema[], void, NSysAuth.PrivateUserHeaders>;
  };

  export type Controller = keyof UserController;
}
