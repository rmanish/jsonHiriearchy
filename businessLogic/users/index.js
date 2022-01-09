'use strict';
import Joi from '@hapi/joi';
import Users from './users';

const users = new Users();
const UserRoute = [{
  method: 'GET',
  path: '/users',
  options: {
    handler: () => {
      return users.find();
    },
    description: 'Get users',
    notes: 'Returns a todo item by the id passed in the path',
    tags: ['api']
  }
}, {
  method: 'GET',
  path: '/users/{id}',
  config: {
    handler: (req) => {
      return users.findOne({
        where: {
          id: req.params.id
        }
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
      params: {
        id: Joi.string().alphanum().min(3).max(30).required().description('the first number')
      }
    },
    description: 'Get todo',
    notes: 'Returns a todo item by the id passed in the path'
  }
}
];
export default UserRoute;
