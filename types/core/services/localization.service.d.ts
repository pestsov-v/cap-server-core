import { IAbstractService } from './abstract.service';

export interface ILocalizationService extends IAbstractService {}

export namespace NLocalizationService {
  export type Config = {
    supportedLanguages: string[];
    defaultLanguages: string;
  };
}
