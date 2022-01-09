'use strict';
import Joi from '@hapi/joi';
import {setKey, getKey, deleteKey, getHashKey, setHashKey, clearRedis} from './cache';

const CacheRoute = [{
  method: 'POST',
  path: '/cache',
  config: {
    handler: (req) => {
      return setKey(req.payload.key, req.payload.value);
    },
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'BadRequest'
          },
          '200': {
            'description': 'this is the final response'
          }
        },
        payloadType: 'json'
      }
    },
    validate: {
      payload: {
        key: Joi.string().required().description('key name'),
        value: Joi.string().required().description('value')
      }
    },
    description: 'Get todo',
    notes: 'Returns a todo item by the id passed in the path'
  }
}, {
  method: 'POST',
  path: '/hashcache/{hash}',
  config: {
    handler: (req) => {
      return setHashKey(req.params.hash, req.payload.key, req.payload.value);
    },
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'BadRequest'
          },
          '200': {
            'description': 'this is the final response'
          }
        },
        payloadType: 'json'
      }
    },
    validate: {
      payload: {
        key: Joi.string().required().description('key name'),
        value: Joi.string().required().description('value')
      },
      params: {
        hash: Joi.string().required().description('key name')
      }
    },
    description: 'Get todo',
    notes: 'Returns a todo item by the id passed in the path'
  }
}, {
  method: 'GET',
  path: '/cache/{key}',
  config: {
    handler: (req) => {
      return getKey(req.params.key);
    },
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'BadRequest'
          },
          '200': {
            'description': 'this is the final response'
          }
        },
        payloadType: 'json'
      }
    },
    validate: {
      params: {
        key: Joi.string().required().description('the first number')
      }
    },
    description: 'Get todo',
    notes: 'Returns a todo item by the id passed in the path'
  }
}, {
  method: 'GET',
  path: '/hashcache/{hash}/{key}',
  config: {
    handler: (req) => {
      return getHashKey(req.params.hash, req.params.key);
    },
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'BadRequest'
          },
          '200': {
            'description': 'this is the final response'
          }
        },
        payloadType: 'json'
      }
    },
    validate: {
      params: {
        key: Joi.string().required().description('key'),
        hash: Joi.string().required().description('hash')
      }
    },
    description: 'Get todo',
    notes: 'Returns a todo item by the id passed in the path'
  }
}, {
  method: 'DELETE',
  path: '/cache/{key}',
  config: {
    handler: (req) => {
      return deleteKey(req.params.key);
    },
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'BadRequest'
          },
          '200': {
            'description': 'this is the final response'
          }
        },
        payloadType: 'json'
      }
    },
    validate: {
      params: {
        key: Joi.string().required().description('the first number')
      }
    },
    description: 'Get todo',
    notes: 'Returns a todo item by the id passed in the path'
  }
}, {
  method: 'DELETE',
  path: '/cache/all',
  config: {
    handler: () => {
      return clearRedis();
    },
    tags: ['api'],
    plugins: {
      'hapi-swagger': {
        responses: {
          '400': {
            'description': 'BadRequest'
          },
          '200': {
            'description': 'this is the final response'
          }
        },
        payloadType: 'json'
      }
    },
    validate: {},
    description: 'Get todo',
    notes: 'Returns a todo item by the id passed in the path'
  }
}];
export default CacheRoute;
