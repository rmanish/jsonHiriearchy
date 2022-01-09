'use strict';
import UserHandlers from './user';
import demoHandlers from './demo';

const handlers = {
  ...UserHandlers,
  ...demoHandlers
};
export default handlers;
