import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import mysql2 from 'mysql2';
// https://github.com/sequelize/sequelize/issues/9489#issuecomment-486047783

dotenv.config();
const db = {};

async function initializeDB () {
  if (process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASSWORD &&
    process.env.DB_HOST && process.env.DB_PORT) {
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      dialect: 'mysql',
      dialectModule: mysql2,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    });
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    return db;
  }
  console.warn('Cannot find DB connection config');
}

function getDBConnection () {
  return db;
}

function isDBAlive () {
  return db.sequelize.authenticate()
    .then(() => {
      return {
        isSuccess: true,
        message: 'Connection has been established successfully'
      };
    })
    .catch(error => {
      return {
        isSuccess: false,
        message: 'Connection Failed !!!!',
        error
      };
    });
};

function closeDBconnection () {
  try {
    db.sequelize.close();
    return 'Connection close successfully';
  } catch (e) {
    return `Connection not close, ${e}`;
  }
};

module.exports = {
  initializeDB,
  getDBConnection,
  isDBAlive,
  closeDBconnection
};
