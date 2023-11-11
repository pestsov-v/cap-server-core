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

  // Loader
  SchemaLoader: Symbol('SchemaLoader'),

  // Agents
  FunctionalityAgent: Symbol('FunctionalityAgent'),
  SchemaAgent: Symbol('SchemaAgent'),

  // Adapters
  FastifyAdapter: Symbol('FastifyAdapter'),

  // Factories
  FrameworkFactory: Symbol('FrameworkFactory'),
} as const;
