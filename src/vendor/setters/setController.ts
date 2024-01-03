import { ControllerStructure } from '@Core/Types';

export const setController = <T extends string>(
  structure: ControllerStructure<T>
): ControllerStructure<T> => {
  return structure;
};
