import 'reflect-metadata';
import { container } from '../../ioc/core.ioc';

import { ISchemaLoader, NSchemaWorker } from '@Core/Types';
import { CoreSymbols } from '@CoreSymbols';
import { MetadataKeys } from '@common';

if (process) {
  process.on('message', async (data: NSchemaWorker.ParentPayload): Promise<void> => {
    if (!data || !data.path) {
      if (process && process.send) {
        const payloadFail: NSchemaWorker.WorkerResultFail = {
          status: 'FAIL',
          message: 'Path is not defined',
        };

        process.send(payloadFail);
      }
      return;
    }

    const loader = container.get<ISchemaLoader>(CoreSymbols.SchemaLoader);
    await loader.init();

    Reflect.defineMetadata(MetadataKeys.SchemaLoader, loader, Reflect);
    await import(data.path);

    if (process && process.send) {
      const payloadOK: NSchemaWorker.WorkerResultOK = {
        status: 'OK',
        schemas: Array.from(loader.services.entries()),
      };
      process.send(payloadOK);
    }

    await loader.destroy();
  });
}
