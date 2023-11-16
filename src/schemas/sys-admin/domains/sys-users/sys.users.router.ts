import { Router } from '@Vendor';
import { NSysUsers } from '../../../../../types/schemas';
import { SysUsersSymbols } from './sys.users.symbols';

@Router<NSysUsers.Paths>(SysUsersSymbols.Router, [
  {
    path: 'v1/profile',
    handler: 'getProfile',
    method: 'GET',
    isPrivateUser: true,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/profile',
    handler: 'updateProfile',
    method: 'PUT',
    isPrivateUser: true,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/password',
    handler: 'updatePassword',
    method: 'PATCH',
    isPrivateUser: true,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/password',
    handler: 'resetPassword',
    method: 'PATCH',
    isPrivateUser: true,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/deactivate-profile',
    handler: 'deactivateProfile',
    method: 'PATCH',
    isPrivateUser: true,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/reactivate-profile',
    handler: 'reactivateProfile',
    method: 'GET',
    isPrivateUser: true,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/profile',
    handler: 'banProfile',
    method: 'PATCH',
    isPrivateUser: true,
    isPrivateOrganization: false,
  },
])
export class SumaRollsRouter {}
