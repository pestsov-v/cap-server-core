export interface IAbstractFrameworkAdapter {
  start(): Promise<void>;
}

export namespace NAbstractFrameworkAdapter {
  export type FailSchemaParameter = 'application' | 'domain' | 'action' | 'action-version';
  export type Handler = () => Promise<void>;

  interface BaseSchemaPayload {
    status: 'OK' | 'FAIL';
  }
  interface SchemaPayloadFail extends BaseSchemaPayload {
    status: 'FAIL';
    message: string;
  }
  interface SchemaPayloadOK extends BaseSchemaPayload {
    status: 'OK';
    application: string;
    domain: string;
    action: string;
  }

  export type SchemaPayload = SchemaPayloadOK | SchemaPayloadFail;
}
