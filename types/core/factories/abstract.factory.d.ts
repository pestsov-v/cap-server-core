export interface IAbstractFactory {
  run<T = unknown>(args: T): Promise<void>;
}
