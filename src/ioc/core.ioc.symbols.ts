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
  GetawayService: Symbol('GetawayService'),
  ContextService: Symbol('ContextService'),
  ScramblerService: Symbol('ScramblerService'),
  SessionService: Symbol('SessionService'),
  LocalizationService: Symbol('LocalizationService'),
  SpecificationService: Symbol('SpecificationService'),

  // Providers
  SchemaProvider: Symbol('SchemaProvider'),
  MongodbProvider: Symbol('MongodbProvider'),
  TypeormProvider: Symbol('TypeormProvider'),
  ExceptionProvider: Symbol('ExceptionProvider'),
  RedisProvider: Symbol('RedisProvider'),
  ValidatorProvider: Symbol('ValidatorProvider'),

  // Integrations
  MailIntegration: Symbol('MailIntegration'),

  // Loader
  SchemaLoader: Symbol('SchemaLoader'),
  SpecificationLoader: Symbol('SpecificationLoader'),

  // Agents
  FunctionalityAgent: Symbol('FunctionalityAgent'),
  SchemaAgent: Symbol('SchemaAgent'),
  BaseOperationAgent: Symbol('BaseOperationAgent'),
  IntegrationAgent: Symbol('IntegrationAgent'),

  // Adapters
  FastifyAdapter: Symbol('FastifyAdapter'),

  WsAdapter: Symbol('WsAdapter'),

  // Factories
  HttpFactory: Symbol('HttpFactory'),

  // Base operations
  ValidatorBaseOperation: Symbol('ValidatorBaseOperation'),
  SpecificationBaseOperation: Symbol('SpecificationBaseOperation'),
} as const;
