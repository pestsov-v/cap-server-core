import { Dictionary } from '@Vendor';
import { SysAuthSymbols } from './sys.auth.symbols';
import { SupportedLanguages } from '../../common/supported-languages';
import { NSysAuth } from '../../../../../types/schemas/sys-admin/sys.auth';

@Dictionary<NSysAuth.Dictionary>(SysAuthSymbols.DictionaryRu, SupportedLanguages.RU, {
  auth: {
    USER_NOT_FOUND: 'Пользователь не найден',
    IS_BLOCKED:
      'Акаунт заблокирован. Обратитесь к администратору системы для возможной разблокировки',
    IS_NOT_VERIFIED: 'Аккаунт не верифицирован.',
    INCORRECT_PASSWORD: 'Неверный пароль',
    MORE_MAX_SESSIONS:
      'Слишком много открытых сессий. Максимальное количество сессий — {{maxSessions}}. Открытые текущие сеансы — {{currentSessions}}.',
  },
})
export class SysAuthL10nRu {}
