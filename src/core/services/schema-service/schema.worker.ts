import 'reflect-metadata';
import { container } from '../../ioc/core.ioc';

import { ISchemaLoader, NSchemaWorker } from '@Core/Types';
import { CoreSymbols } from '@CoreSymbols';
import { MetadataKeys } from '@common';

if (process) {
  process.on('message', async (data: NSchemaWorker.ParentPayload): Promise<void> => {
    if (!data || !data.path) {
      if (process && process.send) {
        process.send({
          status: 'FAIL',
          message: 'Path is not defined',
        });
      }
      return;
    }

    const loader = container.get<ISchemaLoader>(CoreSymbols.SchemaLoader);
    await loader.init();

    Reflect.defineMetadata(MetadataKeys.SchemaLoader, loader, Reflect);
    await import(data.path);

    console.log(loader.services);

    await loader.destroy();
  });
}
