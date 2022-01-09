'use strict';
import {status, resource, ping} from './healthChecks';

const HealthRoute = [{
  method: 'GET',
  path: '/',
  options: {
    handler: () => {
      return status();
    },
    description: 'Check if application alive',
    notes: 'Returns the application is responding to main route',
    tags: ['api', 'internal']
  }
}, {
  method: 'GET',
  path: '/ping', // this route is beaing used by swagger generator. Please do not delete this
  options: {
    handler: () => {
      return ping();
    },
    description: 'Check if service can ping',
    notes: 'This imply that we are responding to the service with a standard ping',
    tags: ['api', 'internal']
  }
}, {
  method: 'GET',
  path: '/stats',
  options: {
    handler: () => {
      return resource();
    },
    description: 'Check if application dependency is alive',
    notes: 'This route will check if the application has all the depency like, DB, ELK working fine or not',
    tags: ['api', 'internal']
  }
}];
export default HealthRoute;
