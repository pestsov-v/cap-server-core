import { Dictionary } from '../../../../core/decorators';
import { NSysUsers } from '../../../../../types/schemas';
import { SysUsersSymbols } from './sys.users.symbols';
import { SupportedLanguages } from '../../common/supported-languages';

@Dictionary<NSysUsers.Dictionary>(SysUsersSymbols.DictionaryEn, SupportedLanguages.EN, {
  user: {
    USER_NOT_FOUND: 'User not found',
    USER_LIST_EMPTY: 'User list is empty',
  },
})
export class SysUserDictionaryEn {}
