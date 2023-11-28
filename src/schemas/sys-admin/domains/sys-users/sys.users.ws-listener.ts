import { WsListener } from '../../../../core/decorators';
import { SysUsersSymbols } from './sys.users.symbols';
import { NSysUsers } from '../../../../../types/schemas';

@WsListener<NSysUsers.WsListener>(SysUsersSymbols.WsListener, {
  loginOrganizationUser: {
    isPrivateUser: false,
    isPrivateOrganization: false,
    listener: async (agent, context) => {
      return {
        type: 'server:session:to:session',
        eventName: 'sys:user',
        payload: {
          lol: 12,
        },
      };
    },
  },
})
export class SysUsersWsListener {}
