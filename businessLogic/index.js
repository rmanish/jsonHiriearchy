'use strict';
import users from './users';
import cache from './cache';
import demoApi from './demoapis';
import hirearchy from './jsonhirearchy';

const routes = [...users, ...demoApi, ...cache, ...hirearchy];
export default routes;
