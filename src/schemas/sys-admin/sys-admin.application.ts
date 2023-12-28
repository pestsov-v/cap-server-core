import { setApplication } from '@Vendor';
import { serviceNames } from '../common/service-names';
import { SysUsersCollector } from './domains/sys-users/sys.users.collector';
import { SysAuthCollector } from './domains/sys-auth/sys.auth.collector';

export const SysAdminApplication = setApplication(serviceNames.SYS_ADMIN, [
  SysUsersCollector,
  SysAuthCollector,
]);
