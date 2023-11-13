import { Router } from '@Vendor';
import { NSysUsers } from '../../../../../types/schemas';
import { SysUsersSymbols } from './sys.users.symbols';

@Router<NSysUsers.Paths>(SysUsersSymbols.Router, [
  {
    handler: 'createUser',
    method: 'POST',
    path: 'v1/create-user',
    isPrivateUser: false,
    isPrivateOrganization: false,
  },
])
export class SumaRollsRouter {}
