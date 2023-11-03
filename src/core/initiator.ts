import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { IInitiator } from '@Core/Types';

@injectable()
export class Initiator implements IInitiator {
  constructor() {}

  public async start(): Promise<void> {
    console.log('initiator start');
  }
  public async stop(): Promise<void> {}
}
