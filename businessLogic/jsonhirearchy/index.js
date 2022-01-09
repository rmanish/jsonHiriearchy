'use strict';
import Joi from '@hapi/joi';
import hirearchy from './hirearchy';

const hirearchyClass = new hirearchy();
const HierarchyRoute = [{
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
}
];
export default HierarchyRoute;
