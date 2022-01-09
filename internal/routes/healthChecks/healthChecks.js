'use strict';
import os from 'os';
import response from '@helpers/responseHelper';
import resCode from '@appconstants/responseCode.json';
import statusCode from '@appconstants/statusCode.json';
import appConfig from '@appConfig';

const status = () => {
  return response.successHandler(statusCode.OK, resCode.OK, {
    serviceName: process.env.SERVICE_NAME,
    version: appConfig.version
  });
};

const ping = () => {
  return 'pong';
};

const resource = () => {
  // TODO: this route should give information about the dependent services status too like DB, queue
  let data = {
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpuUsage: os.cpus().length};
  return response.successHandler(statusCode.OK, resCode.OK, data);
};

export {
  status,
  resource,
  ping
};
