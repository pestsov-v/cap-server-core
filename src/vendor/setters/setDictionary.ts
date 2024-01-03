import { DictionaryStructure, ExtendedRecordObject } from '@Core/Types';

export const setDictionary = <L extends string, D extends ExtendedRecordObject>(
  structure: DictionaryStructure<L, D>
): DictionaryStructure<L, D> => {
  return structure;
};
