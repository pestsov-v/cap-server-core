import { setDictionary } from '@Vendor';
import { NSysAuth } from '../../../../../types/schemas/sys-admin/sys.auth';
import { LanguageKind } from '../../../../../types/schemas';

export const SysAuthDictionaryUA = setDictionary<LanguageKind, NSysAuth.Dictionary>({
  language: 'ua',
  dictionary: {
    auth: {
      IS_BLOCKED:
        'Аккаунт заблокований. Зверніться до адміністратора системи для можливого блокування.',
      IS_NOT_VERIFIED: 'Аккаунт не верифікований.',
      INCORRECT_PASSWORD: 'Невірний пароль.',
      MORE_MAX_SESSIONS:
        'Перевищено ліміт відкритих сесій. Максимальна кількість сесій - {{maxSessions}}. Наразі відкрито сесій - {{currentSessions}}.',
      UNAUTHORIZED: 'Доступ відхилено.',
    },
  },
});
