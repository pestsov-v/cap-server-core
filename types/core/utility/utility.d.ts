export type Voidable<T> = T | void;
export type Nullable<T> = T | null;
export type UnknownObject = Record<string, unknown>;
export type StringObject = Record<string, string>;
export type FnObject = Record<string, AnyFunction>;
export type AnyFunction = (...args: any[]) => any;
