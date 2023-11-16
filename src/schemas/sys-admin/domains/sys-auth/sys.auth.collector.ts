import { Collect } from '@Vendor';
import { SysDomainNames } from '../sys-domain.names';
import { SysAuthSymbols } from './sys.auth.symbols';

@Collect(SysDomainNames.SYS_AUTH, {
  controller: SysAuthSymbols.Controller,
})
export class SysAuthCollector {}
