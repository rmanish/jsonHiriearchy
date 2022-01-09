
'use strict';
import boom from 'boom';
import response from '@helpers/responseHelper';
import resCode from '@appconstants/responseCode.json';
import statusCode from '@appconstants/statusCode.json';

import {serviceInstances} from './../../internal/servicesInit';
const {cache} = serviceInstances;

async function setKey (key, value) {
  try {
    const keyData = await cache.setKey(key, value);
    return response.successHandler(statusCode.OK, resCode.OK, keyData);
  } catch (err) {
    return boom.serverUnavailable(resCode.DB_ERROR, err);
  }
}

async function clearRedis () {
  try {
    const keyData = await cache.cacheClient.flushdb();
    return response.successHandler(statusCode.OK, resCode.OK, keyData);
  } catch (err) {
    return boom.serverUnavailable(resCode.DB_ERROR, err);
  }
}

async function getKey (key) {
  try {
    const keyData = await cache.getWithCompleteKey(key);
    return response.successHandler(statusCode.OK, resCode.OK, keyData);
  } catch (err) {
    return boom.serverUnavailable(resCode.DB_ERROR, err);
  }
}

async function getHashKey (hash, key) {
  try {
    const keyData = await cache.hget(hash, key, true);
    return response.successHandler(statusCode.OK, resCode.OK, keyData);
  } catch (err) {
    return boom.serverUnavailable(resCode.DB_ERROR, err);
  }
}

async function setHashKey (hash, key, value) {
  try {
    const keyData = await cache.hmset(hash, {[key]: JSON.stringify(value)}, true);
    return response.successHandler(statusCode.OK, resCode.OK, keyData);
  } catch (err) {
    return boom.serverUnavailable(resCode.DB_ERROR, err);
  }
}

async function deleteKey (key) {
  try {
    const keyData = await cache.deleteKey(key);
    return response.successHandler(statusCode.OK, resCode.OK, keyData);
  } catch (err) {
    return boom.serverUnavailable(resCode.DB_ERROR, err);
  }
}

export {
  setKey,
  getKey,
  deleteKey,
  getHashKey,
  setHashKey,
  clearRedis
};
