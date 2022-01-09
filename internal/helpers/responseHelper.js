'use strict';
let successHandler = (statusCode, success, data = undefined, message) => {
  const responseObj = {
    statusCode,
    success,
    data,
    message
  };
  return responseObj;
};
export default {
  successHandler
};
