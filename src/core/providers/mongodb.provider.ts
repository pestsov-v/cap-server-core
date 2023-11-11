import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
import { container } from '../ioc/core.ioc';
import { CoreSymbols } from '@CoreSymbols';

import { Mongoose } from '@Packages/Types';
import {
  IFunctionalityAgent,
  IMongodbConnector,
  IMongodbProvider,
  ISchemaAgent,
  NAbstractFrameworkAdapter,
  NMongodbProvider,
} from '@Core/Types';

@injectable()
export class MongodbProvider implements IMongodbProvider {
  constructor(
    @inject(CoreSymbols.MongodbConnector)
    private readonly _mongodbConnector: IMongodbConnector
  ) {}

  public setModels(fnModels: NMongodbProvider.SchemaInfo<unknown>[]) {
    const { connection } = this._mongodbConnector;

    fnModels.forEach((fn) => {
      const agents: NAbstractFrameworkAdapter.Agents = {
        functionalityAgent: container.get<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent),
        schemaAgent: container.get<ISchemaAgent>(CoreSymbols.SchemaAgent),
      };

      const model = fn.getSchema(agents);

      const schema = model.options
        ? new connection.Schema(model.definition, model.options)
        : new connection.Schema(model.definition);

      connection.model(fn.model, schema);
    });
  }

  public async create<TRawDocType>(
    model: string,
    docs: Mongoose.Docs<TRawDocType>,
    options?: Mongoose.SaveOptions
  ): Promise<Mongoose.AnyKeys<TRawDocType>> {
    const models = this._mongodbConnector.connection.models;
    if (!models) this._throwModelsError();
    try {
      return options
        ? await models[model].create<TRawDocType>(docs, options)
        : await models[model].create<TRawDocType>(docs);
    } catch (e) {
      throw e;
    }
  }

  private _throwModelsError() {
    throw new Error('Models not initialize');
  }
}
