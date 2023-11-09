import { Collect } from '@Vendor';
import { DomainNames } from '../../domain-names';
import { SumaRollsSymbols } from './suma.rolls.symbols';

@Collect(DomainNames.SUMA_ROLLS, {
  router: SumaRollsSymbols.Router,
  helper: SumaRollsSymbols.Helper,
  controller: SumaRollsSymbols.Controller,
})
export class SumaRolesCollector {}
