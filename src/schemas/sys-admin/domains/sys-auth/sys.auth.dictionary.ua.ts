import { Dictionary } from '@Vendor';
import { SysAuthSymbols } from './sys.auth.symbols';
import { SupportedLanguages } from '../../common/supported-languages';
import { NSysAuth } from '../../../../../types/schemas/sys-admin/sys.auth';

@Dictionary<NSysAuth.Dictionary>(SysAuthSymbols.DictionaryUa, SupportedLanguages.UA, {
  auth: {
    USER_NOT_FOUND: 'Користувача не знайдено',
    IS_BLOCKED:
      'Аккаунт заблокований. Зверніться до адміністратора системи для можливого блокування.',
    IS_NOT_VERIFIED: 'Аккаунт не верифікований.',
    MORE_MAX_SESSIONS:
      'Перевищено ліміт відкритих сесій. Максимальна кількість сесій - {{maxSessions}}. Наразі відкрито сесій - {{currentSessions}}.',
  },
})
export class SysAuthL10nUa {}
