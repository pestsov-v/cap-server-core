import { setTypeormRepository as schemeSetTypeormRepository } from '@chaminjector/typescheme';
import type { TypeormRepositoryStructure as SchemeTypeormRepositoryStructure } from '@chaminjector/typescheme';
import { AnyObject, TypeormRepoStructure } from '@Core/Types';

export const setTypeormRepo = <T extends AnyObject>(
  structure: TypeormRepoStructure<T>
): SchemeTypeormRepositoryStructure<T> => {
  return schemeSetTypeormRepository(structure);
};
