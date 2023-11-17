import { IAbstractIntegration } from './abstract.integration';

export interface IMailIntegration extends IAbstractIntegration {
  sendMailWithDynamicSender(mail: NMailIntegration.DynamicMail): Promise<void>;
  sendMailWithStaticSender(mail: NMailIntegration.StaticMail): Promise<void>;
}

export namespace NMailIntegration {
  export type Config = {
    enable: boolean;
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    from: string;
    withMessageId: boolean;
  };

  export type DynamicMail = {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
  };

  export type StaticMail = {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  };
}
