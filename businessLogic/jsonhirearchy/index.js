'use strict';
import Joi from '@hapi/joi';
import hirearchy from './hirearchy';

const hirearchyClass = new hirearchy();
const HierarchyRoute = [
{
  method: 'GET',
  path: '/jsonHirearchy',
  options: {
    handler: () => {
      return hirearchyClass.find();
    },
    description: 'Get json hirearchy',
    notes: 'Returns a json with its hirearchy',
    tags: ['api']
  }
},
{
    method: 'GET',
    path: '/gitRepo',
    config: {
       cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
        },
    
      handler: (req) => {
        return hirearchyClass.getGitRepo({
         
            q: req.query.q,
            page:req.query.page,
            perPage:req.query.perPage,
          
        });
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
        query : {
          q: Joi.string().alphanum().min(3).max(30).required().description('search result name'),
          page: Joi.number().required().description('page'),
          perPage:Joi.number().required().description('perPage'),
        }
      },
      description: 'Get pagination',
      notes: 'Returns a pagination result '
    }
  }

];
export default HierarchyRoute;
