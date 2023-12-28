import type { ControllerStructure } from '@Vendor/Types';

export const setController = <T extends string>(
  structure: ControllerStructure<T>
): ControllerStructure<T> => {
  return structure;
};
