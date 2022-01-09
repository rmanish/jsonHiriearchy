'use strict';
const tokenPlugin = (type) => {
  return {
    'hapi-swagger': {
      security: {
        [type === 'header' ? 'APIKeyHeader' : 'APIKeyQueryParam']: []
      },
      responses: {
        401: {
          'description': 'BadRequest'
        }
      }
    }
  };
};
export {
  tokenPlugin
};
