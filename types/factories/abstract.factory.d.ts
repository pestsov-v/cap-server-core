export interface IAbstractFactory<T = unknown> {
  run(args: T): Promise<void>;
  stand(): Promise<void>;
}
