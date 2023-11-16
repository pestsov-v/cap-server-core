import { IAbstractService } from './abstract.service';

export interface ILocalizationService extends IAbstractService {
  getResource(
    service: string,
    domain: string,
    language: string,
    resource: string,
    substitutions?: Record<string, string>
  ): string;
}

export namespace NLocalizationService {
  export type Config = {
    supportedLanguages: string[];
    defaultLanguages: string;
  };

  export type DictionaryRecord = string | Dictionary;
  export type Dictionary = Record<string, DictionaryRecord>;
  export type DomainDictionary = Map<string, Dictionary>;
  export type ServiceDictionaries = Map<string, DomainDictionary>;
  export type Dictionaries = Map<string, ServiceDictionaries>;
}
