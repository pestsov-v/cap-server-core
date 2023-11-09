import { Apply } from '@Vendor';
import { ServiceNames } from '../common/service-names';
import { DomainNames } from './domain-names';

@Apply(ServiceNames.SUSHI_MASTER, [DomainNames.SUMA_ROLLS])
export class SushiMasterApplication {}
