import { setDictionary } from '@Vendor';
import { LanguageKind, NSysUsers } from '../../../../../types/schemas';

export const SysUsersDictionaryRu = setDictionary<LanguageKind, NSysUsers.Dictionary>({
  language: 'ru',
  dictionary: {
    user: {
      USER_NOT_FOUND: 'Пользователь не найден',
      USER_LIST_EMPTY: 'Список пользователей пуст',
    },
  },
});
