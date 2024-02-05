import { setTypeormScheme as schemeSetTypeormScheme } from '@chaminjector/typescheme';
import type { TypeormSchemaStructure as SchemeTypeormSchemaStructure } from '@chaminjector/typescheme';
import { NTypeormProvider, TypeormSchemaStructure } from '@Core/Types';

export const setTypeormSchema = <M extends string, S>(
  structure: TypeormSchemaStructure<M, S>
): SchemeTypeormSchemaStructure<M, NTypeormProvider.SchemaFn<S>> => {
  return schemeSetTypeormScheme(structure.model, structure.getSchema);
};
