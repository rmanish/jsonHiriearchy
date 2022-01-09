'use strict';
import traceApi from './TraceApi';

export const middlewares = [
  traceApi('onRequest')
];
