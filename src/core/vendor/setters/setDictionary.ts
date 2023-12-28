import type { DictionaryStructure } from '@Vendor/Types';
import type { ExtendedRecordObject } from '@Utility/Types';

export const setDictionary = <L extends string, D extends ExtendedRecordObject>(
  structure: DictionaryStructure<L, D>
): DictionaryStructure<L, D> => {
  return structure;
};
