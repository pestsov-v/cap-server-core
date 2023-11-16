import { IMongodbProvider, ITypeormProvider, IValidatorProvider } from '../providers';
import {
  IDiscoveryService,
  IScramblerService,
  ISessionService,
  NScramblerService,
} from '../services';
import { UnknownObject } from '@Utility/Types';
import { Jwt } from '@Packages/Types';

export interface IFunctionalityAgent {
  readonly discovery: NFunctionalityAgent.Discovery;
  readonly mongoose: NFunctionalityAgent.Mongoose;
  readonly utils: NFunctionalityAgent.Utils;
  readonly validator: NFunctionalityAgent.Validator;
  readonly scrambler: NFunctionalityAgent.Scrambler;
  readonly sessions: NFunctionalityAgent.Sessions;
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
    insertMany: IMongodbProvider['insertMany'];
    aggregate: IMongodbProvider['aggregate'];
    hydrate: IMongodbProvider['hydrate'];
    populate: IMongodbProvider['populate'];
    validate: IMongodbProvider['validate'];
    countDocuments: IMongodbProvider['countDocuments'];
    exists: IMongodbProvider['exists'];
    find: IMongodbProvider['find'];
    findById: IMongodbProvider['findById'];
    findByIdAndUpdate: IMongodbProvider['findByIdAndUpdate'];
    findByIdAndDelete: IMongodbProvider['findByIdAndDelete'];
    findOne: IMongodbProvider['findOne'];
    findOneAndUpdate: IMongodbProvider['findOneAndUpdate'];
    findOneAndReplace: IMongodbProvider['findOneAndReplace'];
    findOneAndDelete: IMongodbProvider['findOneAndDelete'];
    updateOne: IMongodbProvider['updateOne'];
    updateMany: IMongodbProvider['updateMany'];
    replaceOne: IMongodbProvider['replaceOne'];
    deleteOne: IMongodbProvider['deleteOne'];
    deleteMany: IMongodbProvider['deleteMany'];
  };

  export type Utils = {
    uuid: string;
  };

  export type Validator = {
    readonly validator: IValidatorProvider['validator'];
    validate: IValidatorProvider['validate'];
  };

  export type typeorm = {
    getRepository<T>(): ITypeormProvider['getRepository'];
  };

  export type Scrambler = {
    readonly accessExpiredAt: IScramblerService['accessExpiredAt'];
    readonly refreshExpiredAt: IScramblerService['refreshExpiredAt'];

    generateAccessToken: IScramblerService['generateAccessToken'];
    generateRefreshToken: IScramblerService['generateRefreshToken'];
    verifyToken: IScramblerService['verifyToken'];
    createHash: IScramblerService['createHash'];
    hashedPassword: IScramblerService['hashedPassword'];
    comparePassword: IScramblerService['comparePassword'];
  };

  export type HttpSessions = {
    openHttpSession: ISessionService['openHttpSession'];
    getHttpSessionInfo: ISessionService['getHttpSessionInfo'];
    getHttpSessionCount: ISessionService['getHttpSessionCount'];
    deleteHttpSession: ISessionService['deleteHttpSession'];
  };

  export type Sessions = {
    http: HttpSessions;
  };
}
