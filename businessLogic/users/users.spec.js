'use strict';
import Users from './users';
import resCode from '@appconstants/responseCode.json';
import statusCode from '@appconstants/statusCode.json';

const users = new Users();

jest.mock('../../internal/servicesInit.js', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  SequelizeMock.Op = {gte: null,
    lte: null};
  return {
    serviceInstances: {
      db: {
        sequelize: dbMock,
        Sequelize: SequelizeMock
      }
    }
  };
});

describe('Users Module', () => {
  it('Get user on the basis of filters', async () => {
    const resp = await users.find();
    expect(resp && resCode.FOUND && statusCode.OK &&
         resp.data).toBeTruthy();
  });
  it('Get one user on the basis of filters', async () => {
    const resp = await users.findOne();
    expect(resp && resCode.FOUND && statusCode.OK &&
     resp.data).toBeTruthy();
  });
});
