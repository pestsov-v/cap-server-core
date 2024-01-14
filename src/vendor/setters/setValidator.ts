import { ValidateRoute, ValidateStructure } from '@Core/Types';

export const setValidator = <T extends Record<string, ValidateRoute>>(
  structure: ValidateStructure<T>
): ValidateStructure<T> => {
  return structure;
};
