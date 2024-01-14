import { MetadataKeys } from '@common';

import { ISchemaLoader, DomainDocuments } from '@Core/Types';

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
    schemaLoader.setEmitter(domain, documents.emitter);
  }
  if (documents.wsListener) {
    schemaLoader.setWsListener(domain, documents.wsListener);
  }

  if (documents.typeormSchema) {
    const { model } = documents.typeormSchema;
    schemaLoader.setTypeormSchema(domain, documents.typeormSchema);

    if (documents.typeormRepo) {
      schemaLoader.setTypeormRepository(domain, model, documents.typeormRepo);
    }
  }
  if (documents.dictionaries) {
    schemaLoader.setDictionaries(domain, documents.dictionaries);
  }

  if (documents.validator) {
    schemaLoader.setValidator(domain, documents.validator);
  }

  return domain;
};
