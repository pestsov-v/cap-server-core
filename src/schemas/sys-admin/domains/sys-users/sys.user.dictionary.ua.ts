import { Dictionary } from '../../../../core/decorators';
import { NSysUsers } from '../../../../../types/schemas';
import { SysUsersSymbols } from './sys.users.symbols';
import { SupportedLanguages } from '../../common/supported-languages';

@Dictionary<NSysUsers.Dictionary>(SysUsersSymbols.DictionaryUa, SupportedLanguages.UA, {
  user: {
    USER_NOT_FOUND: 'Користувач не знайдений',
    USER_LIST_EMPTY: 'Список користувачів пустий',
  },
})
export class SysUserDictionaryUa {}
