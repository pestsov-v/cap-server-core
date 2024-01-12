import { MetadataKeys } from '@common';
import { ISchemaLoader } from '@Core/Types';

export const setService = (name: string, domains: string[]) => {
  const loader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect) as ISchemaLoader;
  domains.forEach((domain) => loader.applyDomainToService(name, domain));

  return name;
};
