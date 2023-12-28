import { setDictionary } from '@Vendor';
import { LanguageKind, NSysUsers } from '../../../../../types/schemas';

export const SysUsersDictionaryEN = setDictionary<LanguageKind, NSysUsers.Dictionary>({
  language: 'en',
  dictionary: {
    user: {
      USER_NOT_FOUND: 'User not found',
      USER_LIST_EMPTY: 'User list is empty',
    },
  },
});
