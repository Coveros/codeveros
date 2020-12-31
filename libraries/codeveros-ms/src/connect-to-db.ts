import { DbOptions } from './interfaces';
import * as orm from './orm';
import { getLogger } from './utils/get-logger';

const logger = getLogger();
const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function connect(uri: string): Promise<void> {
  const options = {
    poolSize: 5,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await orm.connect(uri, options);
  } catch (err) {
    if (err.message && err.message.match(/failed to connect to server .* on first connect/)) {
      logger.error('Failed to connect to db on initial attempt: ', err);
      // Wait for a bit, then try to connect again
      await timeout(10000);
      logger.info('Retrying first connect...');
      await connect(uri);
    } else {
      throw err;
    }
  }
}

export function connectToDb(options: DbOptions) {
  const authPart = options.user ? `${options.user}:${options.pass}@` : '';
  const uri = options.uri || `mongodb://${authPart}${options.host}:${options.port}/${options.database}`;
  return connect(uri);
}
