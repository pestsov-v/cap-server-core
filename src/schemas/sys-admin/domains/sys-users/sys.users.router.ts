import { setRouter } from '@Vendor';
import { NSysUsers } from '../../../../../types/schemas';

export const SysUsersRouter = setRouter<NSysUsers.Paths, NSysUsers.Controller>({
  'v1/profile': {
    GET: {
      handler: 'getProfile',
      isPrivateUser: true,
      isPrivateOrganization: false,
    },
    PUT: {
      handler: 'updateProfile',
      isPrivateUser: true,
      isPrivateOrganization: false,
    },
    PATCH: {
      handler: 'banProfile',
      isPrivateUser: true,
      isPrivateOrganization: false,
    },
  },
  'v1/password': {
    PATCH: {
      handler: 'updatePassword',
      isPrivateUser: true,
      isPrivateOrganization: false,
    },
    PUT: {
      handler: 'resetPassword',
      isPrivateUser: false,
      isPrivateOrganization: false,
    },
  },
  'v1/deactivate-profile': {
    PATCH: {
      handler: 'deactivateProfile',
      isPrivateUser: true,
      isPrivateOrganization: false,
    },
  },
  'v1/reactivate-profile': {
    GET: {
      handler: 'reactivateProfile',
      isPrivateUser: true,
      isPrivateOrganization: false,
    },
  },
});
