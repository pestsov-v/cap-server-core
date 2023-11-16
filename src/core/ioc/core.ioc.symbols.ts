export const CoreSymbols = {
  // Initiator
  Initiator: Symbol('Initiator'),

  // Connectors
  ServiceConnector: Symbol('ServiceConnector'),
  MongodbConnector: Symbol('MongodbConnector'),
  TypeormConnector: Symbol('TypeormConnector'),
  RedisConnector: Symbol('RedisConnector'),

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

  // Loader
  SchemaLoader: Symbol('SchemaLoader'),

  // Agents
  FunctionalityAgent: Symbol('FunctionalityAgent'),
  SchemaAgent: Symbol('SchemaAgent'),
  BaseOperationAgent: Symbol('BaseOperationAgent'),

  // Adapters
  FastifyAdapter: Symbol('FastifyAdapter'),

  // Factories
  FrameworkFactory: Symbol('FrameworkFactory'),

  // Base operations
  ValidatorBaseOperation: Symbol('ValidatorBaseOperation'),
  AuthBaseOperation: Symbol('AuthBaseOperation'),
} as const;
