import axios from 'axios';
import boom from 'boom';

const config = {};

export function _mergeConfig (config, incomingConfig) {
  config.headers = config.headers || {};
  incomingConfig.headers = incomingConfig.headers || {};
  return {...config,
    ...incomingConfig,
    headers: {...config.headers,
      ...incomingConfig.headers}};
}

export default {
  getApi: async (url, incomingConfig) => {
    if (!url) { return boom.badRequest('URL is not defined'); }
    return axios.get(url, _mergeConfig(config, incomingConfig));
  },
  postApi: (url, incomingConfig, payload) => {
    if (!url) { return boom.badRequest('URL is not defined'); }
    if (!payload) { return boom.badRequest('Payload is not defined'); }
    return axios.post(url, payload, _mergeConfig(config, incomingConfig));
  },
  putApi: (url, incomingConfig, payload) => {
    if (!url) { return boom.badRequest('URL is not defined'); }
    if (!payload) { return boom.badRequest('Payload is not defined'); }
    return axios.put(url, payload, _mergeConfig(config, incomingConfig));
  },
  deleteApi: (url, incomingConfig) => {
    if (!url) { return boom.badRequest('URL is not defined'); }
    return axios.delete(url, _mergeConfig(config, incomingConfig));
  }
};
