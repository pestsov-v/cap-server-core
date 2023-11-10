import { Apply } from '@Vendor';
import { serviceNames } from '../common/service-names';
import { domainNames } from './domain-names';

@Apply(serviceNames.SUSHI_MASTER, [domainNames.SUMA_ROLLS])
export class SushiMasterApplication {}
