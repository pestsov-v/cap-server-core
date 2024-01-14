import { Typeorm } from '../packages/packages';
import { NAbstractHttpAdapter } from '../adapters';
import { ObjectLiteral } from 'typeorm';

export type Voidable<T> = T | void;
export type Nullable<T> = T | null;
export type UnknownObject = Record<string, unknown>;
export type StringObject = Record<string, string>;
export type AnyObject = Record<string, any>;
export type AnyFunction = (...args: any[]) => any;
export type FnObject = Record<string, AnyFunction>;
export const enum BoolYesNo {
  YES = 'Y',
  NO = 'N',
}
export type Varchar<T extends number> = string;
export type Char<T extends string> = string;
export type UUID = string;
export type ExtendedRecordObject = Record<string, ExtendedObject | string>;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'TRACE';

export type UTCDate = {
  date: string;
  time: string;
  utc: string;
};

export type KeyStringLiteralBuilder<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]: T[K] extends Record<string, unknown>
        ? `${string & K}:${KeyStringLiteralBuilder<T[K]>}`
        : `${string & K}`;
    }[keyof T]
  : string;

export type TypeormRepository<S, T> = {
  [K in keyof T]: T[K] extends (data: infer D, ...args: infer A) => infer R
    ? (provider: Typeorm.Repository<S>, data: D, ...args: A) => R
    : T[K];
};
export type ControllerHandler<
  BODY = void,
  PARAMS = void,
  HEADERS = void,
  RESULT = void,
  SESSION_INFO = void
> = NAbstractHttpAdapter.Handler<BODY, PARAMS, HEADERS, RESULT, SESSION_INFO, 'fastify'>;

export type OrderFormat = 'ASC' | 'DESC';
export type SortObject = { field: string; order: OrderFormat };

export type FilterObject = { field: string; value: ObjectLiteral };
export type CodeLiteral = `${string}.${string}.${string}`;
