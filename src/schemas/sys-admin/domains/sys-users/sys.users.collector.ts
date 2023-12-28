import { setCollector } from '@Vendor';
import { SysDomainNames } from '../sys-domain.names';
import { SysUsersRouter } from './sys.users.router';
import { SysUsersController } from './sys.users.controller';
import { SysUsersTypeormRepository } from './sys.users.typeorm.repository';
import { SysUsersTypeormSchema } from './sys.users.typeorm.schema';

export const SysUsersCollector = setCollector(SysDomainNames.SYS_USERS, {
  router: SysUsersRouter,
  controller: SysUsersController,
  typeormRepo: SysUsersTypeormRepository,
  typeormSchema: SysUsersTypeormSchema,
});
