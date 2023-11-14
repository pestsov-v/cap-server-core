import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { v4 } = Packages.uuid;
import { container } from '../ioc/core.ioc';
import { Joi, Jwt, Mongoose } from '@Packages/Types';
import { CoreSymbols } from '@CoreSymbols';

import {
  IDiscoveryService,
  IFunctionalityAgent,
  IMongodbProvider,
  IScramblerService,
  IValidatorProvider,
  NFunctionalityAgent,
  NScramblerService,
} from '@Core/Types';
import { UnknownObject } from '@Utility/Types';

@injectable()
export class FunctionalityAgent implements IFunctionalityAgent {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.ScramblerService)
    private readonly _scramblerService: IScramblerService
  ) {}

  public get discovery(): NFunctionalityAgent.Discovery {
    return {
      getMandatory: <T>(name: string): T => {
        return this._discoveryService.getSchemaMandatory<T>(name);
      },
      getString: (name: string, def: string): string => {
        return this._discoveryService.getSchemaString(name, def);
      },
      getNumber: (name: string, def: number): number => {
        return this._discoveryService.getSchemaNumber(name, def);
      },
      getBoolean: (name: string, def: boolean): boolean => {
        return this._discoveryService.getSchemaBoolean(name, def);
      },
      getArray: <T>(name: string, def: Array<T>): Array<T> => {
        return this._discoveryService.getSchemaArray<T>(name, def);
      },
      getBuffer: async (path: string): Promise<Buffer> => {
        return this._discoveryService.getSchemaBuffer(path);
      },
    };
  }

  public get mongoose(): NFunctionalityAgent.Mongoose {
    return {
      create: async <T>(
        model: string,
        docs: Mongoose.Docs<T>,
        options: Mongoose.SaveOptions
      ): Promise<Mongoose.AnyKeys<T>> => {
        return container
          .get<IMongodbProvider>(CoreSymbols.MongodbProvider)
          .create(model, docs, options);
      },
    };
  }

  public get utils(): NFunctionalityAgent.Utils {
    return {
      uuid: v4(),
    };
  }

  public get validator(): NFunctionalityAgent.Validator {
    return {
      validator: container.get<IValidatorProvider>(CoreSymbols.ValidatorProvider).validator,
      validate: <T>(map: Joi.ObjectSchema<T>, body: T) => {
        return container
          .get<IValidatorProvider>(CoreSymbols.ValidatorProvider)
          .validate<T>(map, body);
      },
    };
  }

  public get scrambler(): NFunctionalityAgent.Scrambler {
    return {
      accessExpiredAt: this._scramblerService.accessExpiredAt,
      refreshExpiredAt: this._scramblerService.refreshExpiredAt,
      generateAccessToken: <T extends UnknownObject>(
        payload: T,
        algorithm?: Jwt.Algorithm
      ): NScramblerService.ConvertJwtInfo => {
        return this._scramblerService.generateAccessToken(payload, algorithm);
      },
      generateRefreshToken: <T extends UnknownObject>(
        payload: T,
        algorithm?: Jwt.Algorithm
      ): NScramblerService.ConvertJwtInfo => {
        return this._scramblerService.generateRefreshToken(payload, algorithm);
      },
      verifyToken: async <T extends UnknownObject>(
        token: string
      ): Promise<NScramblerService.JwtTokenPayload<T>> => {
        return this._scramblerService.verifyToken(token);
      },
      createHash: (algorithm?: Jwt.Algorithm): string => {
        return this._scramblerService.createHash(algorithm);
      },
      hashedPassword: async (password: string): Promise<string> => {
        return this._scramblerService.hashedPassword(password);
      },
      comparePassword: async (
        candidatePassword: string,
        userPassword: string
      ): Promise<boolean> => {
        return this._scramblerService.comparePassword(candidatePassword, userPassword);
      },
    };
  }
}
