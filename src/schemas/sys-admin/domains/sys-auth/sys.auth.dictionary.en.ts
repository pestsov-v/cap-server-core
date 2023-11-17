import { Dictionary } from '@Vendor';
import { SysAuthSymbols } from './sys.auth.symbols';
import { SupportedLanguages } from '../../common/supported-languages';
import { NSysAuth } from '../../../../../types/schemas/sys-admin/sys.auth';

@Dictionary<NSysAuth.Dictionary>(SysAuthSymbols.DictionaryEn, SupportedLanguages.EN, {
  auth: {
    USER_NOT_FOUND: 'User not found.',
    IS_BLOCKED: 'Account is blocked. Contact your system administrator for possible blocking.',
    INCORRECT_PASSWORD: 'Incorrect password.',
    IS_NOT_VERIFIED: 'The account not verified.',
    MORE_MAX_SESSIONS:
      'Too many open sessions. Maximum number of sessions - {{maxSessions}}. Open current sessions - {{currentSessions}}.',
  },
})
export class SysAuthL10nEn {}
