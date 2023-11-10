import { Collect } from '@Vendor';
import { domainNames } from '../../domain-names';
import { SumaRollsSymbols } from './suma.rolls.symbols';

@Collect(domainNames.SUMA_ROLLS, {
  router: SumaRollsSymbols.Router,
  helper: SumaRollsSymbols.Helper,
  controller: SumaRollsSymbols.Controller,
})
export class SumaRolesCollector {}
