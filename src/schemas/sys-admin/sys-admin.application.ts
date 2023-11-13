import { Apply } from '@Vendor';
import { serviceNames } from '../common/service-names';
import { SysDomainNames } from './domains/sys-domain.names';

@Apply(serviceNames.SYS_ADMIN, [SysDomainNames.SYS_USERS])
export class SushiMasterApplication {}
