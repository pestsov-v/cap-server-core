import { TypeormSchemaStructure } from '@Core/Types';

export const setTypeormSchema = <M extends string, S>(
  structure: TypeormSchemaStructure<M, S>
): TypeormSchemaStructure<M, S> => {
  return structure;
};
