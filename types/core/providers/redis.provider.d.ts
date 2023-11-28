import { Nullable, UnknownObject } from '@Utility/Types';

export interface IRedisProvider {
  setWithExpire<T extends UnknownObject>(id: string, info: T, ttl: number): Promise<void>;
  getItemInfo<T extends UnknownObject>(id: string): Promise<Nullable<T>>;
  getItemCount(id: string): Promise<number>;
  getItemByUserId<
    T extends UnknownObject & { connectionId: string } = UnknownObject & { connectionId: string }
  >(
    id: string
  ): Promise<T>;
  setItemInfo<T extends UnknownObject>(id: string, data: T): Promise<void>;
  updateItemField<T extends UnknownObject>(
    id: string,
    field: keyof T,
    value: T[keyof T]
  ): Promise<void>;
  setItemField<T extends UnknownObject>(
    id: string,
    field: keyof T,
    value: T[keyof T]
  ): Promise<void>;
  deleteItem(id: string): Promise<void>;
}

export namespace NRedisProvider {}
