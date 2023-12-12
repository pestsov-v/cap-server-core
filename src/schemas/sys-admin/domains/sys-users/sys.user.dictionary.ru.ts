import { Dictionary } from '../../../../core/decorators';
import { NSysUsers } from '../../../../../types/schemas';
import { SysUsersSymbols } from './sys.users.symbols';
import { SupportedLanguages } from '../../common/supported-languages';

@Dictionary<NSysUsers.Dictionary>(SysUsersSymbols.DictionaryRu, SupportedLanguages.RU, {
  user: {
    USER_NOT_FOUND: 'Пользователь не найден',
    USER_LIST_EMPTY: 'Список пользователей пуст',
  },
})
export class SysUserDictionaryRu {}
