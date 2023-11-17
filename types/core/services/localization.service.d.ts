import { IAbstractService } from './abstract.service';
import { UnknownObject } from '@Utility/Types';

export interface ILocalizationService extends IAbstractService {
  readonly supportedLanguages: string[];
  readonly defaultLanguages: string;

  loadDictionaries(dictionaries: NLocalizationService.Dictionaries): void;
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

  export type DictionaryRecord<T = UnknownObject> = string | Dictionary<T>;
  export type Dictionary<T extends UnknownObject = UnknownObject> = Record<
    string,
    DictionaryRecord<T>
  >;
  export type DomainDictionary = Map<string, Dictionary>;
  export type ServiceDictionaries = Map<string, DomainDictionary>;
  export type Dictionaries = Map<string, ServiceDictionaries>;
}