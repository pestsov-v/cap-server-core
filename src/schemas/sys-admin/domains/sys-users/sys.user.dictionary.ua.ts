import { setDictionary } from '@Vendor';
import { LanguageKind, NSysUsers } from '../../../../../types/schemas';

export const SysUsersDictionaryUa = setDictionary<LanguageKind, NSysUsers.Dictionary>({
  language: 'ua',
  dictionary: {
    user: {
      USER_NOT_FOUND: 'Користувач не знайдений',
      USER_LIST_EMPTY: 'Список користувачів пустий',
    },
  },
});
