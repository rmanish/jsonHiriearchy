'use strict';
import hierarchy from './hirearchy';
import resCode from '@appconstants/responseCode.json';
import statusCode from '@appconstants/statusCode.json';

const hierarchyClass = new hierarchy();

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

describe('Hierarchy Module', () => {
  it('Maintaing the hierarchy', async () => {
    const resp = await hierarchyClass.find();
    expect(resp && resCode.FOUND && statusCode.OK &&
         resp.data).toBeTruthy();
  });

});
