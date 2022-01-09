import hapi from 'hapi';
import dotenv from 'dotenv';
const appConfig = require('../serviceSetup');
const {initiatServices, terminateServices} = require('./servicesInit');

require('source-map-support/register');
dotenv.config();
const appHandlers = {};

const isQueueRequired = appConfig.config.isQueueRequired;
const shouldEnableLogging = JSON.parse(process.env.ENABLE_LOGGING || 'false');

if (shouldEnableLogging) {
  require('./helpers/console');
}

// start services
const bootstrapApplication = async () => {
  await initiatServices();
  // intiate server
  const server = await new hapi.Server({
    port: process.env.PORT,
    host: process.env.HOST
  });

  // register Middlewares
  const {middlewares} = require('./middlewares'); // eslint-disable-line import/first
  await middlewares.forEach(server.ext.bind(server));

  // register Routes
  const {routes} = require('./routes');
  await server.route(routes);

  const onDeath = async () => {
    await terminateServices();
    process.exit();
  };

  process.on('SIGINT', onDeath);
  process.on('SIGQUIT', onDeath);
  process.on('SIGTERM', onDeath);
  process.on('unhandledRejection', async () => {
    await terminateServices();
    process.exit(1);
  });

  return {
    server
  };
};

export default bootstrapApplication;

const main = async (event) => {
  const app = await bootstrapApplication();
  let path = event.path.split(`${process.env.SERVICE_NAME}`)[1];
  if(!path){
    path = '/';
  }
  // TODO: we still need to handle the multiquerystringparameter
  if(event.queryStringParameters){
    Object.keys(event.queryStringParameters).map((key,index)=>{
      if(!index){
        path = path+'?';
      } else {
        path = path+'&';
      }
      path = path+key+'='+event.queryStringParameters[key];
    })
  }
  const resp = await app.server.inject({
    method: event.httpMethod,
    url: path,
    payload: event.body,
    headers: event.headers,
    validate: true
  });

  return {
    statusCode: resp.result.statusCode,
    body: JSON.stringify(resp.result)
  };
};

if(isQueueRequired){
  appHandlers.subs= require('../subscribers').default;
}
// exposing all handlers on root lavel
appHandlers.main= main;
export const handlers = appHandlers;
