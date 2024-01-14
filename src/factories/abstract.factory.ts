import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { IAbstractFactory } from '@Core/Types';

@injectable()
export abstract class AbstractFactory<T> implements IAbstractFactory<T> {
  public abstract run(args: T): Promise<void>;
  public abstract stand(): Promise<void>;
}
