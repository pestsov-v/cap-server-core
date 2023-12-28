import { setDictionary } from '@Vendor';
import { NSysAuth } from '../../../../../types/schemas/sys-admin/sys.auth';
import { LanguageKind } from '../../../../../types/schemas';

export const SysAuthDictionaryRU = setDictionary<LanguageKind, NSysAuth.Dictionary>({
  language: 'ru',
  dictionary: {
    auth: {
      IS_BLOCKED:
        'Акаунт заблокирован. Обратитесь к администратору системы для возможной разблокировки',
      IS_NOT_VERIFIED: 'Аккаунт не верифицирован.',
      INCORRECT_PASSWORD: 'Неверный пароль',
      MORE_MAX_SESSIONS:
        'Слишком много открытых сессий. Максимальное количество сессий — {{maxSessions}}. Открытые текущие сеансы — {{currentSessions}}.',
      UNAUTHORIZED: 'Доступ отклонён.',
    },
  },
});
