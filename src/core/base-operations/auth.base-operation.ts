import { Packages } from '@Packages';
const { injectable } = Packages.inversify;

import { ResponseType } from '@common';
import { IAuthBaseOperation, NAuthBaseOperation } from '@Core/Types';

@injectable()
export class AuthBaseOperation implements IAuthBaseOperation {
  public getFailResponse(status: number, message: string): NAuthBaseOperation.FailResponse {
    return {
      format: 'json',
      type: 'OK',
      responseType: ResponseType.FAIL,
      statusCode: status,
      data: { message },
    };
  }
}
