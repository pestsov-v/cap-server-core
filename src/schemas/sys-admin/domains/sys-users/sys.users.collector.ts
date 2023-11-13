import { Collect } from '@Vendor';
import { SysDomainNames } from '../sys-domain.names';
import { SysUsersSymbols } from './sys.users.symbols';

@Collect(SysDomainNames.SYS_USERS, {
  typeormSchema: SysUsersSymbols.TypeormSchema,
})
export class SysUsersCollector {}
