import { setRouter } from '@Vendor';
import { NSysAuth } from '../../../../../types/schemas/sys-admin/sys.auth';

export const SysAuthRouter = setRouter<NSysAuth.Paths, NSysAuth.Controller>({
  'v1/signup': {
    POST: {
      handler: 'signup',
      isPrivateUser: false,
      isPrivateOrganization: false,
    },
  },
  'v1/login': {
    POST: {
      handler: 'login',
      isPrivateUser: false,
      isPrivateOrganization: false,
    },
  },
  'v1/logout': {
    GET: {
      handler: 'logout',
      isPrivateUser: true,
      isPrivateOrganization: false,
    },
  },
  'v1/activate-account': {
    GET: {
      handler: 'activateAccount',
      isPrivateUser: false,
      isPrivateOrganization: false,
    },
  },
  'v1/forgot-password': {
    PATCH: {
      handler: 'forgotPassword',
      isPrivateUser: false,
      isPrivateOrganization: false,
    },
  },
});
