import { Packages } from '@Packages';
const { injectable } = Packages.inversify;
import { IBaseOperationAgent } from '@Core/Types';

@injectable()
export class BaseOperationAgent implements IBaseOperationAgent {}
