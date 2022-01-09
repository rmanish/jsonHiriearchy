require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
      acquire: 30000
    },
    define: {
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      }
    }
  }
};
