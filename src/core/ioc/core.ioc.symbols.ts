export const CoreSymbols = {
  // Initiator
  Initiator: Symbol('Initiator'),

  // Connectors
  ServiceConnector: Symbol('ServiceConnector'),
  MongodbConnector: Symbol('MongodbConnector'),
  TypeormConnector: Symbol('TypeormConnector'),
  RedisConnector: Symbol('RedisConnector'),
  IntegrationConnector: Symbol('IntegrationConnector'),

  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  LoggerService: Symbol('LoggerService'),
  SchemaService: Symbol('SchemaService'),
  ContextService: Symbol('ContextService'),
  ScramblerService: Symbol('ScramblerService'),
  SessionService: Symbol('SessionService'),
  LocalizationService: Symbol('LocalizationService'),

  // Providers
  SchemaProvider: Symbol('SchemaProvider'),
  MongodbProvider: Symbol('MongodbProvider'),
  TypeormProvider: Symbol('TypeormProvider'),
  ValidatorProvider: Symbol('ValidatorProvider'),
  ExceptionProvider: Symbol('ExceptionProvider'),
  RedisProvider: Symbol('RedisProvider'),

  // Integrations
  MailIntegration: Symbol('MailIntegration'),

  // Loader
  SchemaLoader: Symbol('SchemaLoader'),

  // Agents
  FunctionalityAgent: Symbol('FunctionalityAgent'),
  SchemaAgent: Symbol('SchemaAgent'),
  BaseOperationAgent: Symbol('BaseOperationAgent'),
  IntegrationAgent: Symbol('IntegrationAgent'),

  // Adapters
  FastifyAdapter: Symbol('FastifyAdapter'),

  WsAdapter: Symbol('WsAdapter'),

  // Factories
  FrameworkFactory: Symbol('FrameworkFactory'),

  // Base operations
  ValidatorBaseOperation: Symbol('ValidatorBaseOperation'),
} as const;
