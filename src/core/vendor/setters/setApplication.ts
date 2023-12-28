import { MetadataKeys } from '@common';
import { ISchemaLoader } from '@Core/Types';

export const setApplication = (name: string, collectors: string[]) => {
  const loader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect) as ISchemaLoader;
  collectors.forEach((domain) => loader.applyDomainToService(name, domain));

  return name;
};
