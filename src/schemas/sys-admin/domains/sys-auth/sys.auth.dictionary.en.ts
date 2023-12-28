import { setDictionary } from '@Vendor';
import { NSysAuth } from '../../../../../types/schemas/sys-admin/sys.auth';
import { LanguageKind } from '../../../../../types/schemas';

export const SysAuthDictionaryEN = setDictionary<LanguageKind, NSysAuth.Dictionary>({
  language: 'en',
  dictionary: {
    auth: {
      IS_BLOCKED: 'Account is blocked. Contact your system administrator for possible blocking.',
      INCORRECT_PASSWORD: 'Incorrect password.',
      IS_NOT_VERIFIED: 'The account not verified.',
      MORE_MAX_SESSIONS:
        'Too many open sessions. Maximum number of sessions - {{maxSessions}}. Open current sessions - {{currentSessions}}.',
      UNAUTHORIZED: 'Unauthorized request.',
    },
  },
});
