export type ServiceNames = {
  SYS_ADMIN: 'SysAdmin';
};

export type ServiceName = ServiceNames[keyof ServiceNames];

export type DomainNames = {
  SYS_AUTH: 'SysAuth';
  SYS_USERS: 'SysUsers';
};

export type DomainName = DomainNames[keyof DomainNames];

export type LanguageKind = 'en' | 'ru' | 'ua';
