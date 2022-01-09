'use strict';
import boom from 'boom';
import response from '@helpers/responseHelper';
import resCode from '@appconstants/responseCode.json';
import statusCode from '@appconstants/statusCode.json';

export default class User {
  async find (option = {}) {
    try {
      const users = {"id":1,"name":"manish"};
      return response.successHandler(statusCode.OK, resCode.OK, users);
    } catch (err) {
      return boom.serverUnavailable(resCode.DB_ERROR, err);
    }
  }
  async findOne (option = {}) {
    try {
      option.limit = 1;
      const user = {"id":1,"name":"manish"};;
      return response.successHandler(statusCode.OK, resCode.OK, user);
    } catch (err) {
      return boom.serverUnavailable(resCode.DB_ERROR, err);
    }
  }
}
