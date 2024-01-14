import { ControllerHandler, ControllerStructure } from '@Core/Types';

export const setController = <T extends Record<string, ControllerHandler>>(
  structure: ControllerStructure<T>
): ControllerStructure<T> => {
  return structure;
};
