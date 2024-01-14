import { Packages, yup } from '@Packages';
const { injectable } = Packages.inversify;

@injectable()
export class ValidatorProvider {
  public get validator(): typeof yup {
    return yup;
  }
}
