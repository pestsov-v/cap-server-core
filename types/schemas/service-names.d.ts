export type ServiceNames = {
  SUSHI_MASTER: 'SushiMaster';
  SYS_ADMIN: 'SysAdmin';
};

export type ServiceName = ServiceNames[keyof ServiceNames];
