import { setCollector } from '@Vendor';
import { SysAuthController } from './sys.auth.controller';
import { SysAuthRouter } from './sys.auth.router';
import { SysDomainNames } from '../../common/sys-domain.names';
import { SysAuthDictionaryEN } from './sys.auth.dictionary.en';
import { SysAuthDictionaryRU } from './sys.auth.dictionary.ru';
import { SysAuthDictionaryUA } from './sys.auth.dictionary.ua';

export const SysAuthCollector = setCollector(SysDomainNames.SYS_AUTH, {
  controller: SysAuthController,
  router: SysAuthRouter,
  dictionaries: [SysAuthDictionaryEN, SysAuthDictionaryRU, SysAuthDictionaryUA],
});
