export type Voidable<T> = T | void;
export type Nullable<T> = T | null;
export type UnknownObject = Record<string, unknown>;
export type StringObject = Record<string, string>;
export type FnObject = Record<string, AnyFunction>;
export type AnyFunction = (...args: any[]) => any;
export const enum BoolYesNo {
  YES = 'Y',
  NO = 'N',
}
export type Varchar<T extends number> = string;
export type Char<T extends string> = string;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'TRACE';
