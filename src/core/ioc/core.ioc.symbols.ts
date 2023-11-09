export const CoreSymbols = {
  // Initiator
  Initiator: Symbol('Initiator'),

  // Connectors
  ServiceConnector: Symbol('ServiceConnector'),

  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  LoggerService: Symbol('LoggerService'),
  SchemaService: Symbol('SchemaService'),
  ContextService: Symbol('ContextService'),

  // Loader
  SchemaLoader: Symbol('SchemaLoader'),

  // Agents
  FunctionalityAgent: Symbol('FunctionalityAgent'),
} as const;
