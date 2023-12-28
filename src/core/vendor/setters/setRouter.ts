import { RouterStructure } from '@Vendor/Types';

export const setRouter = <T extends string, C extends string>(
  structure: RouterStructure<T, C>
): RouterStructure<T, C> => {
  return structure;
};
