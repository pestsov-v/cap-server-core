import { IAbstractFactory } from '@Core/Types';

export abstract class AbstractFactory implements IAbstractFactory {
  public abstract run<T>(args: T): Promise<void>;
}
