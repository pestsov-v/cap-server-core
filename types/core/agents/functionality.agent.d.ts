import { IMongodbProvider, IValidatorProvider } from '../providers';
import { IDiscoveryService } from '../services';

export interface IFunctionalityAgent {
  readonly discovery: NFunctionalityAgent.Discovery;
  readonly mongoose: NFunctionalityAgent.Mongoose;
  readonly utils: NFunctionalityAgent.Utils;
  readonly validator: NFunctionalityAgent.Validator;
}

export namespace NFunctionalityAgent {
  export type Discovery = {
    getMandatory: IDiscoveryService['getSchemaMandatory'];
    getString: IDiscoveryService['getSchemaString'];
    getNumber: IDiscoveryService['getSchemaNumber'];
    getBoolean: IDiscoveryService['getSchemaBoolean'];
    getArray: IDiscoveryService['getSchemaArray'];
    getBuffer: IDiscoveryService['getSchemaBuffer'];
  };

  export type Mongoose = {
    create: IMongodbProvider['create'];
  };

  export type Utils = {
    uuid: string;
  };

  export type Validator = {
    readonly validator: IValidatorProvider['validator'];
    validate: IValidatorProvider['validate'];
  };
}
