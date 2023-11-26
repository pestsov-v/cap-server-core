import { Packages } from '@Packages';
const { injectable, inject } = Packages.inversify;
const { v4 } = Packages.uuid;
import { CoreSymbols } from '@CoreSymbols';
import { AbstractService } from './abstract.service';

import {
  IContextService,
  IDiscoveryService,
  ILoggerService,
  IRedisProvider,
  IScramblerService,
  ISessionService,
  NSessionService,
} from '@Core/Types';
import { container } from '../ioc/core.ioc';
import { Nullable, UnknownObject } from '@Utility/Types';
import { Ws } from '@Packages/Types';
import { Guards } from '@Guards';

@injectable()
export class SessionService extends AbstractService implements ISessionService {
  protected readonly _SERVICE_NAME = SessionService.name;
  protected _config: NSessionService.Config | undefined;
  private _connections: NSessionService.ConnectionStorage | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService,
    @inject(CoreSymbols.ScramblerService)
    protected readonly _scramblerService: IScramblerService,
    @inject(CoreSymbols.ContextService)
    protected readonly _contextService: IContextService
  ) {
    super();
  }

  private _setConfig() {
    this._config = {
      serverTag: this._discoveryService.serverTag,
    };
  }

  protected async init(): Promise<boolean> {
    this._setConfig();
    if (!this._config) throw this._throwConfigError();
    this._connections = new Map<string, NSessionService.Connection>();

    return true;
  }

  public async openHttpSession<T extends UnknownObject>(
    userId: string,
    payload: T
  ): Promise<string> {
    if (!this._config) throw this._throwConfigError();

    const sessionId = v4();
    const id = this._formedSessionId(userId, sessionId);

    try {
      await container
        .get<IRedisProvider>(CoreSymbols.RedisProvider)
        .setWithExpire(id, payload, this._scramblerService.accessExpiredAt);

      return sessionId;
    } catch (e) {
      throw e;
    }
  }

  public async getHttpSessionCount(userId: string): Promise<number> {
    try {
      const id = `userId:${userId}:*`;
      return await container.get<IRedisProvider>(CoreSymbols.RedisProvider).getItemCount(id);
    } catch (e) {
      throw e;
    }
  }

  public async getHttpSessionInfo<T extends UnknownObject>(
    userId: string,
    sessionId: string
  ): Promise<Nullable<T>> {
    const formedSessionId = this._formedSessionId(userId, sessionId);

    try {
      return await container
        .get<IRedisProvider>(CoreSymbols.RedisProvider)
        .getItemInfo<T>(formedSessionId);
    } catch (e) {
      throw e;
    }
  }

  public async deleteHttpSession(userId: string, sessionId: string): Promise<void> {
    try {
      const formedSessionId = this._formedSessionId(userId, sessionId);
      await container.get<IRedisProvider>(CoreSymbols.RedisProvider).deleteItem(formedSessionId);
    } catch (e) {
      throw e;
    }
  }

  public setWebsocketConnection(ws: Ws.WebSocket, connection: NSessionService.Connection) {
    if (!this._connections) {
      throw new Error('Websocket adapter is not initialize');
    }

    if (!this._config) throw this._throwConfigError();

    const uuid = v4();

    ws.uuid = uuid;
    this._connections.set(uuid, connection);
    this._sendHandshake(ws, { connectionId: uuid });

    ws.on('message', async (data) => {
      if (!this._connections) throw this._throwConnectionError();

      let session: NSessionService.SocketRequest<unknown> = { anonymous: true };

      if (ws.userId && ws.sessionId) {
        const sessionId = this._formedSessionId(ws.userId, ws.sessionId);
        const sessionInfo = await container
          .get<IRedisProvider>(CoreSymbols.RedisProvider)
          .getItemInfo(sessionId);

        session = { anonymous: false, sessionInfo };
      }

      try {
        const payload = JSON.parse(data.toString());
        if (Guards.isSocketStructure(payload)) {
          switch (payload.event) {
            case 'client:handshake':
              if (Guards.isClientHandshake(payload.payload)) {
                const connection = this._connections.get(ws.uuid);
                if (connection) {
                  connection.socket.sessionId = payload.payload.sessionId;
                  connection.socket.userId = payload.payload.userId;

                  ws.sessionId = payload.payload.sessionId;
                  ws.userId = payload.payload.userId;
                }
              } else {
                this._send(ws, 'server:handshake', {
                  code: '1001.1001',
                  message: 'userId or sessionId is not set',
                });
              }
              break;
            case 'client:session:to:session':
              break;
            case 'client:broadcast:to:service':
              break;
            default:
              const events: NSessionService.ClientEvent[] = [
                'client:session:to:session',
                'client:broadcast:to:service',
              ];
              this._sendSessionToSession(ws, {
                message: `Invalid event type. Supported event types: ${events.join(', ')}`,
              });
          }
        } else {
          this._sendSessionToSession(ws, {
            message: 'Invalid payload format. Payload must be contain event type and payload',
          });
        }
      } catch (e) {
        this._sendSessionToSession(ws, {
          message: 'Invalid payload format. Payload must be object',
        });
      }
    });
  }

  private _sendHandshake(
    socket: Ws.WebSocket,
    payload: NSessionService.ServerHandshakePayload
  ): void {
    this._send(socket, 'server:handshake', payload);
  }

  private _sendSessionToSession<T>(socket: Ws.WebSocket, payload: T): void {
    this._send<T>(socket, 'server:session:to:session', payload);
  }

  private _listenSessionToSession<T>(payload: T): void {
    console.log(payload);
  }

  private _sendBroadcastToSession<T>(socket: Ws.WebSocket, payload: T): void {
    this._send<T>(socket, 'server:broadcast:to:service', payload);
  }

  private _send<T>(socket: Ws.WebSocket, event: NSessionService.ServerEvent, payload: T): void {
    socket.send(JSON.stringify({ event, payload }));
  }

  private _checkDisconnection() {
    if (!this._connections) throw this._throwConnectionError();

    this._connections.forEach((connection, connectionId) => {
      if (!this._connections) throw this._throwConfigError();
    });
  }

  protected async destroy(): Promise<void> {
    this._config = undefined;
    this._connections = undefined;
  }

  private _formedSessionId(userId: string, sessionId: string): string {
    if (!this._config) throw this._throwConfigError();

    return `userId:${userId}:service:${this._contextService.store.service}:serverTag:${this._config.serverTag}:sessionId:${sessionId}`;
  }

  private _throwConfigError(): Error {
    return new Error('Config not set');
  }

  private _throwConnectionError() {
    return new Error('Connection storage not initialize');
  }

  private _checkSessionType(socket: Ws.WebSocket): boolean {
    return typeof socket.userId === 'string' && typeof socket.sessionId === 'string';
  }
}
