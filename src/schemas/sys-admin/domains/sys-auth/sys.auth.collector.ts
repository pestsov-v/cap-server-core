import { setCollector } from '@Vendor';
import { SysDomainNames } from '../sys-domain.names';
import { SysAuthController } from './sys.auth.controller';
import { SysAuthRouter } from './sys.auth.router';

export const SysAuthCollector = setCollector(SysDomainNames.SYS_AUTH, {
  controller: SysAuthController,
  router: SysAuthRouter,
});
