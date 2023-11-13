import { TypeormRepository } from '@Vendor';
import { SysUsersSymbols } from './sys.users.symbols';
import { NSysUsers } from '../../../../../types/schemas';
import { Typeorm } from '@Packages/Types';

@TypeormRepository<NSysUsers.UserRepository>(SysUsersSymbols.TypeormRepository, {
  create: async (
    repository: Typeorm.Repository<NSysUsers.UserEntitySchema>,
    user: NSysUsers.UserEntitySchema
  ): Promise<void> => {
    try {
      await repository.save(user);
    } catch (e) {
      throw e;
    }
  },
})
export class SysUsersTypeormRepository {}
