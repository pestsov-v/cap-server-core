export const CoreSymbols = {
  // Initiator
  Initiator: Symbol('Initiator'),

  // Connectors
  ServiceConnector: Symbol('ServiceConnector'),
  MongodbConnector: Symbol('MongodbConnector'),

  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  LoggerService: Symbol('LoggerService'),
  SchemaService: Symbol('SchemaService'),
  ContextService: Symbol('ContextService'),

  // Providers
  SchemaProvider: Symbol('SchemaProvider'),
  MongodbProvider: Symbol('MongodbProvider'),
  ValidatorProvider: Symbol('ValidatorProvider'),
  ExceptionProvider: Symbol('ExceptionProvider'),

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
} as const;
