import mongoose from 'mongoose';
import util from 'util';
import debug from 'debug';

// config should be imported before importing any other file
import { mongoUri, mongooseDebug, port, env } from './config/config.mjs';
import app from './config/express.mjs';

debug('express-mongoose-es6-rest-api:index');

// connect to mongo db
mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

app.listen(port, () => {
  console.info(`server started on port ${port} (${env})`); // eslint-disable-line no-console
});

export default app;
