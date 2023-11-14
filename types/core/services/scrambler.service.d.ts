import { IAbstractService } from './abstract.service';

import { UnknownObject } from '@Utility/Types';
import { Jwt } from '@Packages/Types';

export interface IScramblerService extends IAbstractService {
  readonly accessExpiredAt: number;
  readonly refreshExpiredAt: number;

  generateAccessToken<P extends UnknownObject>(
    payload: P,
    algorithm?: Jwt.Algorithm
  ): NScramblerService.ConvertJwtInfo;
  generateRefreshToken<P extends UnknownObject>(
    payload: P,
    algorithm?: Jwt.Algorithm
  ): NScramblerService.ConvertJwtInfo;
  verifyToken<T extends UnknownObject>(
    token: string
  ): Promise<NScramblerService.JwtTokenPayload<T>>;
  createHash(algorithm?: Jwt.Algorithm): string;
  hashedPassword(password: string): Promise<string>;
  comparePassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

export namespace NScramblerService {
  export type Config = {
    enable: boolean;
    salt: number;
    secret: string;
    randomBytes: number;
    accessExpiredAt: number;
    refreshExpiredAt: number;
    defaultAlgorithm: string;
  };

  export type ConvertJwtInfo = {
    jwt: string;
    jwtId: string;
  };

  export type JwtTokenPayload<T extends UnknownObject> = {
    iat: number;
    exp: number;
    payload: T;
  };
}
