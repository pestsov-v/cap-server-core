export namespace NSchemaWorker {
  export type ParentPayload =
    | {
        path: string;
      }
    | undefined;

  export interface BaseWorkerResult {
    status: 'OK' | 'FAIL';
  }

  export interface WorkerResultOK extends BaseWorkerResult {
    status: 'OK';
  }
  export interface WorkerResultFail extends BaseWorkerResult {
    status: 'FAIL';
    message: string;
  }

  export type WorkerResult = WorkerResultOK | WorkerResultFail;
}
