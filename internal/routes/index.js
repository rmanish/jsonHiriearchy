'use strict';
import appRoutes from '../../businessLogic';
import healthChecks from './healthChecks';

export const routes = [...healthChecks, ...appRoutes]
