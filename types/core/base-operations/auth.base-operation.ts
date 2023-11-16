export interface IAuthBaseOperation {
  getFailResponse(status: number, message: string): NAuthBaseOperation.FailResponse;
}

export namespace NAuthBaseOperation {
  export type FailResponse = {
    format: 'json';
    type: 'OK';
    responseType: string;
    statusCode: number;
    data: {
      message: string;
    };
  };
}
