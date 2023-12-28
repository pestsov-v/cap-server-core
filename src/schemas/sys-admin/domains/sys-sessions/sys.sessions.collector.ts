import { Collect } from '../../../../core/decorators';
import { SysSessionsSymbols } from './sys.sessions.symbols';
import { SysDomainNames } from '../../common/sys-domain.names';

@Collect(SysDomainNames.SYS_SESSIONS, {
  controller: SysSessionsSymbols.Controller,
})
export class SysSessionsCollector {}
