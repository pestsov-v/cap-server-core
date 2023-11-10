import { container } from './ioc/core.ioc';
import { CoreSymbols } from '@CoreSymbols';

import { IInitiator } from '@Core/Types';

const server = container.get<IInitiator>(CoreSymbols.Initiator);

const startServer = async () => {
  await server.start();
};

const stopServer = async () => {
  await server.stop();
  process.removeAllListeners();
  process.exit(0);
};

process.on('SIGTERM', stopServer);
process.on('SIGINT', stopServer);
process.on('SIGHUP', stopServer);
process.on('uncaughtException', (e) => {
  console.error(e);
  server.stop().then(() => {
    process.exit(1);
  });
});
process.on('unhandledRejection', (reason, parameter) => {
  parameter.catch((e) => {
    console.error(e);
    server.stop().then(() => {
      process.exit(1);
    });
  });
});

startServer().catch((e) => {
  console.log('Server end with error: ', e);
});

const s = () => {
  return async function () {
    return { format: 'status', statusCode: 'sa' };
  };
};

const l = async () => s();

// l()
//   .then((log) => log().then((res) => console.log(res)))
//   .catch((e) => console.log(e));

console.log(l());
