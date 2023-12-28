import { setTypeormRepo } from '@Vendor';
import { NSysUsers } from '../../../../../types/schemas';

export const SysUsersTypeormRepository = setTypeormRepo<NSysUsers.UserRepository>({
  create: async (repository, user: NSysUsers.UserEntitySchema): Promise<void> => {
    try {
      await repository.save(user);
    } catch (e) {
      throw e;
    }
  },
});
