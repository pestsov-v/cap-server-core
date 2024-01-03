import { AnyObject, TypeormRepoStructure } from '@Core/Types';

export const setTypeormRepo = <T extends AnyObject>(
  structure: TypeormRepoStructure<T>
): TypeormRepoStructure<T> => {
  return structure;
};
