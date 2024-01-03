import { EmitterStructure } from '@Core/Types';

export const setEmitter = <T extends string>(
  structure: EmitterStructure<T>
): EmitterStructure<T> => {
  return structure;
};
