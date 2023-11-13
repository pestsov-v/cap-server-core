import { Controller } from '@Vendor';
import { SysUsersSymbols } from './sys.users.symbols';
import { NSysUsers } from '../../../../../types/schemas';

@Controller<NSysUsers.UserController>(SysUsersSymbols.Controller, {
  createUser: async (request, agents) => {
    const typeormRepo = agents.schemaAgent.getTypeormRepository<NSysUsers.UserRepository>();
  },
})
export class SysUsersController {}
