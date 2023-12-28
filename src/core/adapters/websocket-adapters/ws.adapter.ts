import { Packages } from '@Packages';
import { AbstractWebsocketAdapter } from './abstract.websocket-adapter';
const { injectable, inject } = Packages.inversify;
const { http } = Packages.http;
const { https } = Packages.https;
const { ws } = Packages.ws;
const { v4 } = Packages.uuid;

import { CoreSymbols } from '@CoreSymbols';

import { Http, Https, Ws } from '@Packages/Types';
import {
  IAbstractWebsocketAdapter,
  IDiscoveryService,
  ILoggerService,
  ISessionService,
  NAbstractWebsocketAdapter,
} from '@Core/Types';

@injectable()
export class WsAdapter extends AbstractWebsocketAdapter<'ws'> implements IAbstractWebsocketAdapter {
  protected readonly _ADAPTER_NAME = WsAdapter.name;
  protected _config: NAbstractWebsocketAdapter.Config | undefined;
  protected _instance: Ws.WebSocketServer | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.SessionService)
    protected readonly _sessionService: ISessionService
  ) {
    super();
  }

  private _setConfig(): void {
    this._config = {
      protocol: this._discoveryService.getString('adapters:websocket:protocol', 'ws'),
      host: this._discoveryService.getString('adapters:websocket:host', 'localhost'),
      port: this._discoveryService.getNumber('adapters:websocket:port', 11043),
      connection: {
        checkInterval: this._discoveryService.getNumber(
          'adapters:websocket:connection:checkInterval',
          300
        ),
      },
    };
  }

  public async start(): Promise<void> {
    this._setConfig();

    if (!this._config) throw this._throwConfigError();

    const { protocol, host, port } = this._config;
    let server: Http.Server | Https.Server;
    switch (true) {
      case protocol === 'ws':
        server = http.createServer();
        break;
      case protocol === 'wss':
        server = https.createServer();
        break;
      default:
        throw new Error(`Unsupported protocol - ${protocol}`);
    }

    try {
      this._instance = new ws.WebSocketServer({ noServer: true });

      this._instance.on('connection', (ws: Ws.WebSocket, request: Http.IncomingMessage) => {
        this._sessionService.setWsConnection(ws, {
          userAgent: request.headers['user-agent'],
          acceptLanguage: request.headers['accept-language'],
          websocketKey: request.headers['sec-websocket-key'],
          ip: request.socket.remoteAddress,
        });
      });

      server.on('upgrade', (request, socket, head) => {
        this._instance?.handleUpgrade(request, socket, head, (ws) => {
          this._instance?.emit('connection', ws, request);
        });
      });

      server.listen({ host, port });

      this._loggerService.system(`Websocket server listening on ${protocol}://${host}:${port}`, {
        scope: 'Core',
        namespace: this._ADAPTER_NAME,
        tag: 'Connection',
      });
    } catch (e) {
      throw e;
    }
  }

  public async stop(): Promise<void> {
    this._config = undefined;
    if (!this._instance) return;

    this._instance.close();
    this._instance = undefined;

    this._loggerService.system(`Websocket server has been stopped.`, {
      scope: 'Core',
      namespace: this._ADAPTER_NAME,
      tag: 'Destroy',
    });
  }

  private _throwConfigError() {
    return new Error('Config not set');
  }
}
