import { MetadataKeys } from '@common';

import type { ISchemaLoader } from '@Core/Types';
import type { DomainDocuments } from '@Vendor/Types';

export const setCollector = (domain: string, documents: DomainDocuments) => {
  const schemaLoader: ISchemaLoader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect);

  schemaLoader.setDomain(domain);
  if (documents.router) {
    schemaLoader.setRoute(domain, documents.router);
  }
  if (documents.controller) {
    schemaLoader.setController(domain, documents.controller);
  }
  if (documents.emitter) {
  }
  if (documents.wsListener) {
  }
  if (documents.typeormSchema) {
    const { model } = documents.typeormSchema;
    schemaLoader.setTypeormSchema(domain, documents.typeormSchema);

    if (documents.typeormRepo) {
      schemaLoader.setTypeormRepository(domain, model, documents.typeormRepo);
    }
  }
  if (documents.dictionaries) {
  }

  return domain;
};
