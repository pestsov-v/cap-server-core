import type { TypeormRepoStructure } from '@Vendor/Types';
import type { AnyObject } from '@Utility/Types';

export const setTypeormRepo = <T extends AnyObject>(
  structure: TypeormRepoStructure<T>
): TypeormRepoStructure<T> => {
  return structure;
};
