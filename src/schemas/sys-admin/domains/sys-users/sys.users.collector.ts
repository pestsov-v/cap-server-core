import { setCollector } from '@Vendor';
import { SysUsersRouter } from './sys.users.router';
import { SysUsersController } from './sys.users.controller';
import { SysUsersTypeormRepository } from './sys.users.typeorm.repository';
import { SysUsersTypeormSchema } from './sys.users.typeorm.schema';
import { SysDomainNames } from '../../common/sys-domain.names';
import { SysUsersDictionaryEN } from './sys.user.dictionary.en';
import { SysUsersDictionaryRu } from './sys.user.dictionary.ru';
import { SysUsersDictionaryUa } from './sys.user.dictionary.ua';

export const SysUsersCollector = setCollector(SysDomainNames.SYS_USERS, {
  router: SysUsersRouter,
  controller: SysUsersController,
  typeormRepo: SysUsersTypeormRepository,
  typeormSchema: SysUsersTypeormSchema,
  dictionaries: [SysUsersDictionaryEN, SysUsersDictionaryRu, SysUsersDictionaryUa],
});
