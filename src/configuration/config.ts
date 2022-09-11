import * as dotenv from 'dotenv';
dotenv.config();
let mongoUri = process.env.MONGODB_USER
  ? `${process.env.MONGODB_URI_SCHEME}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
  : `${process.env.MONGODB_URI_SCHEME}://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;

// enable using authsource when connect
if (process.env.MONGODB_AUTHSOURCE) {
  mongoUri = `${mongoUri}&authSource=${process.env.MONGODB_AUTHSOURCE}`;
}

export default () => {
  return {
    mongodb: {
      uri: mongoUri,
      connectionTimeout:
        parseInt(process.env.MONGODB_CONNECTION_TIMEOUT, 10) || 10000,
      socketTimeout: parseInt(process.env.MONGODB_SOCKET_TIMEOUT, 10) || 10000,
      retryAttempts: parseInt(process.env.MONGODB_RETRY_ATTEMPTS, 10) || 5,
    },
    graphql: {
      typePaths: process.env.TYPEPATHS,
      debug: Boolean(JSON.parse(process.env.GRAPHQL_DEBUG || '0')),
      playground: Boolean(JSON.parse(process.env.GRAPHQL_PLAYGROUND || '0')),
    },
    rabbitmq: {
      urls: process.env.RABBITMQ_URLS,
      queueName: process.env.RABBITMQ_QUEUE_NAME,
    },
    port: parseInt(process.env.PORT, 10) || 3031,
    authUrl: process.env.AUTH_URL,
  };
};
