import { Router } from '@Vendor';
import { SysAuthSymbols } from './sys.auth.symbols';
import { NSysAuth } from '../../../../../types/schemas/sys-admin/sys.auth';

@Router<NSysAuth.Paths>(SysAuthSymbols.Router, [
  {
    path: 'v1/signup',
    method: 'POST',
    handler: 'signup',
    isPrivateUser: false,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/login',
    method: 'GET',
    handler: 'login',
    isPrivateUser: false,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/forgot-password',
    method: 'PATCH',
    handler: 'forgotPassword',
    isPrivateUser: false,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/activate-account',
    method: 'GET',
    handler: 'activateAccount',
    isPrivateUser: false,
    isPrivateOrganization: false,
  },
  {
    path: 'v1/logout',
    handler: 'logout',
    method: 'GET',
    isPrivateUser: true,
    isPrivateOrganization: false,
  },
])
export class SysAuthRouter {}
