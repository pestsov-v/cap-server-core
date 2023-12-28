import { setTypeormRepo } from '@Vendor';
import { NSysUsers } from '../../../../../types/schemas';
import { Typeorm } from '@Packages/Types';

export const SysUsersTypeormRepository = setTypeormRepo<NSysUsers.IRepository>({
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
});
